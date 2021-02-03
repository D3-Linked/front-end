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


@Component({
  selector: 'app-leveringen',
  templateUrl: './leveringen.component.html',
  styleUrls: ['./leveringen.component.scss', '../../../app.component.scss', '../../admin_style.scss']
})
export class LeveringenComponent implements OnInit {

  leveringen: Levering[];
  displayedColumns: string[] = ['omschrijving', 'laadkade', 'schedule', 'leverancier', 'bedrijf', 'deleteLevering'];
  dataSource: MatTableDataSource<Levering>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  get fromDate() { return this.range.get('start').value; }
  get toDate() { return this.range.get('end').value; }

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getLeveringen();
  }

  getLeveringen() {
    this._adminService.getLeveringen().subscribe(
      result => {
        this.leveringen = result;
        this.dataSource = new MatTableDataSource(this.leveringen);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filter) =>{
          console.log("hallo")
          if (this.fromDate && this.toDate) {
            return data.schedule.datum >= this.fromDate && data.schedule.datum <= this.toDate;
          }
          return true;
        }
      }
    );
  }

  //Apply filter when input in filterform
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Navigate to add journalist page
  addLevering() {
    this.route.navigate(['/addLevering']);
  }

  //Delete a journalist from API, then get all journalists again for update page
  deleteLevering(id: number) {
    this._adminService.deleteLevering(id).subscribe(
      result => this.getLeveringen()
    );
  }

  editLevering(id: number) {
    this.route.navigate(['/editLevering'], { queryParams: { id } });
  }

}
