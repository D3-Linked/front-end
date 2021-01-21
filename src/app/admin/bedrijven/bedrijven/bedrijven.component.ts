import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Bedrijf } from '../../../models/bedrijf.model';

@Component({
  selector: 'app-bedrijven',
  templateUrl: './bedrijven.component.html',
  styleUrls: ['./bedrijven.component.scss']
})
export class BedrijvenComponent implements OnInit {
  bedrijven: Bedrijf[];
  displayedColumns: string[] = ['naam', 'deleteBedrijf'];
  dataSource: MatTableDataSource<Bedrijf>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getBedrijven();
  }

  getBedrijven() {
    this._adminService.getBedrijven().subscribe(
      result => {
        this.bedrijven = result;
        this.dataSource = new MatTableDataSource(this.bedrijven);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  addBedrijf() {
    this.route.navigate(['/addBedrijf']);
  }

  //Delete a journalist from API, then get all journalists again for update page
  deleteBedrijf(id: number) {
    this._adminService.deleteBedrijf(id).subscribe(
      result => this.getBedrijven()
    );
  }

  editBedrijf(id: number) {
    this.route.navigate(['/editBedrijf'], { queryParams: { id }});
  }

}
