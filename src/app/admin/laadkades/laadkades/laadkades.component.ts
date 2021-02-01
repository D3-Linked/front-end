import { Component, OnInit } from '@angular/core';

import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Laadkade } from '../../../models/laadkade.model';

@Component({
  selector: 'app-laadkades',
  templateUrl: './laadkades.component.html',
  styleUrls: ['./laadkades.component.scss', '../../../app.component.scss', '../../admin_style.scss']
})
export class LaadkadesComponent implements OnInit {

  laadkades: Laadkade[];
  displayedColumns: string[] = ['nummer', 'isBezet', 'deleteLaadkade'];
  dataSource: MatTableDataSource<Laadkade>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getLaadkades();
  }

  getLaadkades() {
    this._adminService.getLaadkades().subscribe(
      result => {
        this.laadkades = result;
        this.dataSource = new MatTableDataSource(this.laadkades);
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
  addLaadkade() {
    this.route.navigate(['/addLaadkade']);
  }

  //Delete a journalist from API, then get all journalists again for update page
  deleteLaadkade(id: number) {
    this._adminService.deleteLaadkade(id).subscribe(
      result => this.getLaadkades()
    );
  }

  editLaadkade(id: number) {
    this.route.navigate(['/editLaadkade'], { queryParams: { id }});
  }

}
