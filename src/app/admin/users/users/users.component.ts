import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { User } from '../../../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../../../app.component.scss']
})
export class UsersComponent implements OnInit {

  gebruikers: User[];
  displayedColumns: string[] = ['naam', 'email', 'rol', 'deleteGebruiker'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getGebruikers();
  }

  getGebruikers() {
    this._adminService.getUsers().subscribe(
      result => {
        this.gebruikers = result;
        this.dataSource = new MatTableDataSource(this.gebruikers);
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
  addGebruiker() {
    this.route.navigate(['/addGebruiker']);
  }

  //Delete a journalist from API, then get all journalists again for update page
  deleteGebruiker(id: number) {
    this._adminService.deleteUser(id).subscribe(
      result => this.getGebruikers()
    );
  }

  editGebruiker(id: number) {
    this.route.navigate(['/editGebruiker'], { queryParams: { id }});
  }

}
