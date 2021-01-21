import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Role } from '../../../models/role.model';

@Component({
  selector: 'app-rollen',
  templateUrl: './rollen.component.html',
  styleUrls: ['./rollen.component.scss']
})
export class RollenComponent implements OnInit {

  rollen: Role[];
  displayedColumns: string[] = ['naam', 'deleteRol'];
  dataSource: MatTableDataSource<Role>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getRollen();
  }

  getRollen() {
    this._adminService.getRoles().subscribe(
      result => {
        this.rollen = result;
        this.dataSource = new MatTableDataSource(this.rollen);
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

  addRol() {
    this.route.navigate(['/addRol']);
  }

  deleteRol(id: number) {
    this._adminService.deleteRole(id).subscribe(
      result => this.getRollen()
    );
  }

  editRol(id: number) {
    this.route.navigate(['/editRol'], { queryParams: { id }});
  }

}
