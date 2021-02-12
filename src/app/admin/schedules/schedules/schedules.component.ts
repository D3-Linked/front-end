import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Schedule } from '../../../models/schedule.model';
import { Levering } from 'src/app/models/levering.model';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Product } from 'src/app/models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: [
    './schedules.component.scss',
    '../../../app.component.scss',
    '../../admin_style.scss',
  ],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SchedulesComponent implements OnInit {
  schedules: Schedule[];
  displayedColumns: string[] = [
    'datum',
    'opmerking',
    'creator',
    'deleteSchedule',
  ];
  dataSource: MatTableDataSource<Schedule>;
  expandedElement: Schedule | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  get fromDate() {
    return this.range.get('start').value;
  }
  get toDate() {
    return this.range.get('end').value;
  }

  startDate: string;
  endDate: string;

  constructor(
    private _adminService: AdminService,
    private route: Router,
    private snackbar: MatSnackBar,
    private datePipe: DatePipe
  ) { }

  leveringen: Levering[] = null;
  producten: Product[] = null;

  ngOnInit(): void {
    this.getSchedules();
  }

  //Haal alle laadkades op uit de database om weer te geven op de overzichtspagina
  getSchedulesByDateRange() {
    this.startDate = this.datePipe.transform(
      new Date(this.fromDate),
      'yyyy-MM-ddThh:mm:ss.SSS'
    );
    console.log(this.startDate);
    this.endDate = this.datePipe.transform(
      new Date(this.toDate),
      'yyyy-MM-ddThh:mm:ss.SSS'
    );
    console.log(this.endDate);
    this._adminService
      .getSchedulesByDateRange(this.startDate, this.endDate)
      .subscribe((result) => {
        this.schedules = result;
        this.dataSource = new MatTableDataSource(this.schedules);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(result);
      });
  }

  //Haal alle laadkades op uit de database om weer te geven op de overzichtspagina
  getSchedules() {
    this._adminService.getSchedules().subscribe((result) => {
      this.schedules = result;
      this.dataSource = new MatTableDataSource(this.schedules);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data, filter) => {
        if (this.fromDate && this.toDate) {
          return (
            data.datum >= this.fromDate &&
            data.datum <= this.toDate
          );
        }
        return true;
      };
    });
  }

  //Haal alle leveringen van een bepaalde schedule op uit de database om weer te geven op de overzichtspagina
  getLeveringenByScheduleID(id: number) {
    this._adminService.getLeveringenByScheduleId(id).subscribe((result) => {
      this.leveringen = result;
      this.producten = null;
    });
    return this.leveringen;
  }

  //Knop om de producten van een levering te bekijken
  viewProducts(id: number) {
    this.getProductenByLeveringID(id);
  }

  //Knop om de producten van een levering te verbergen
  hideProducts() {
    this.producten = null;
  }

  //Haal alle producten van een bepaalde levering op uit de database om weer te geven op de overzichtspagina
  getProductenByLeveringID(id: number) {
    this._adminService.getProductenByLeveringId(id).subscribe((result) => {
      this.producten = result;
    });
    return this.producten;
  }

  //Filter toepassen als er input komt in het filtervak
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Navigeer naar de schedule toevoegen pagina
  addSchedule() {
    this.route.navigate(['/addSchedule']);
  }

  //Verwijder een schedule aan de hand van zijn id
  deleteSchedule(id: number) {
    this._adminService.deleteSchedule(id).subscribe(
      (result) => {
        this.getSchedules();
      },
      (error) => {
        this.snackbar.open(
          'Deze planning kan niet verwijderd worden, er zijn nog leveringen voor deze planning',
          'OK',
          {
            duration: 3500,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          }
        );
      }
    );
  }

  //Ga naar de bewerk schedule pagina, met de id als parameter
  editSchedule(id: number) {
    this.route.navigate(['/editSchedule'], { queryParams: { id } });
  }

  //Navigeer naar de levering toevoegen pagina
  addLevering(scheduleID: number) {
    this.route.navigate(['/addLevering'], { queryParams: { scheduleID } });
  }

  //Verwijder een levering aan de hand van zijn id
  deleteLevering(leveringID: number, scheduleID: number) {
    this._adminService
      .deleteLevering(leveringID)
      .subscribe((result) => this.getLeveringenByScheduleID(scheduleID));
  }

  //Ga naar de bewerk levering pagina, met de id als parameter
  editLevering(id: number) {
    this.route.navigate(['/editLevering'], { queryParams: { id } });
  }

  //Navigeer naar de product toevoegen pagina
  addProduct(leveringID: number) {
    this.route.navigate(['/addProduct'], { queryParams: { leveringID } });
  }

  //Verwijder een product aan de hand van zijn id
  deleteProduct(producTID: number, scheduleID: number) {
    this._adminService
      .deleteProduct(producTID)
      .subscribe((result) => this.getLeveringenByScheduleID(scheduleID));
  }

  //Ga naar de bewerk product pagina, met de id als parameter
  editProduct(id: number) {
    this.route.navigate(['/editProduct'], { queryParams: { id } });
  }
}
