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

  getLeveringenByScheduleID(id: number) {
    this._adminService.getLeveringenByScheduleId(id).subscribe((result) => {
      this.leveringen = result;
      this.producten = null;
    });
    return this.leveringen;
  }

  viewProducts(id: number) {
    this.getProductenByLeveringID(id);
  }

  hideProducts() {
    this.producten = null;
  }

  getProductenByLeveringID(id: number) {
    this._adminService.getProductenByLeveringId(id).subscribe((result) => {
      this.producten = result;
    });
    return this.producten;
  }

  //Apply filter when input in filterform
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addSchedule() {
    this.route.navigate(['/addSchedule']);
  }

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

  editSchedule(id: number) {
    this.route.navigate(['/editSchedule'], { queryParams: { id } });
  }

  addLevering(scheduleID: number) {
    this.route.navigate(['/addLevering'], { queryParams: { scheduleID } });
  }

  //Delete a journalist from API, then get all journalists again for update page
  deleteLevering(leveringID: number, scheduleID: number) {
    this._adminService
      .deleteLevering(leveringID)
      .subscribe((result) => this.getLeveringenByScheduleID(scheduleID));
  }

  editLevering(id: number) {
    this.route.navigate(['/editLevering'], { queryParams: { id } });
  }

  addProduct(leveringID: number) {
    this.route.navigate(['/addProduct'], { queryParams: { leveringID } });
  }

  //Delete a journalist from API, then get all journalists again for update page
  deleteProduct(producTID: number, scheduleID: number) {
    this._adminService
      .deleteProduct(producTID)
      .subscribe((result) => this.getLeveringenByScheduleID(scheduleID));
  }

  editProduct(id: number) {
    this.route.navigate(['/editProduct'], { queryParams: { id } });
  }
}
