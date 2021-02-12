import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Levering } from '../../../models/levering.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leveringen',
  templateUrl: './leveringen.component.html',
  styleUrls: [
    './leveringen.component.scss',
    '../../../app.component.scss',
    '../../admin_style.scss',
  ],
})
export class LeveringenComponent implements OnInit {
  leveringen: Levering[];
  leveringenByDate: Levering[];
  displayedColumns: string[] = [
    'omschrijving',
    'laadkade',
    'schedule',
    'leverancier',
    'bedrijf',
    'status',
    'deleteLevering',
  ];
  dataSource: MatTableDataSource<Levering>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  //Maak het formulier voor de datepicker filter
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  //Haal de data op uit het formulier
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
    private datePipe: DatePipe
  ) {}


  ngOnInit(): void {
    this.getLeveringen();
  }

  //Haal alle leveringen op uit de database binnen de gegeven date range om weer te geven op de overzichtspagina
  getLeveringenByDateRange() {
    this.startDate = this.datePipe.transform(
      new Date(this.fromDate),
      'yyyy-MM-ddThh:mm:ss.SSS'
    );
    this.endDate = this.datePipe.transform(
      new Date(this.toDate),
      'yyyy-MM-ddThh:mm:ss.SSS'
    );
    this._adminService
      .getLeveringenByDateRange(this.startDate, this.endDate)
      .subscribe((result) => {
        this.leveringen = result;
        this.dataSource = new MatTableDataSource(this.leveringen);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  //Haal alle leveringen op uit de database om weer te geven op de overzichtspagina
  getLeveringen() {
    this._adminService.getLeveringen().subscribe((result) => {
      this.leveringen = result;
      this.dataSource = new MatTableDataSource(this.leveringen);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data, filter) => {
        if (this.fromDate && this.toDate) {
          return (
            data.schedule.datum >= this.fromDate &&
            data.schedule.datum <= this.toDate
          );
        }
        return true;
      };
    });
  }

  //Filter toepassen als er input komt in het filtervak
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Navigeer naar de levering toevoegen pagina
  addLevering() {
    this.route.navigate(['/addLevering']);
  }

  //Verwijder een levering aan de hand van zijn id
  deleteLevering(id: number) {
    this._adminService
      .deleteLevering(id)
      .subscribe((result) => this.getLeveringen());
  }

  //Ga naar de bewerk levering pagina, met de id als parameter
  editLevering(id: number) {
    this.route.navigate(['/editLevering'], { queryParams: { id } });
  }
}
