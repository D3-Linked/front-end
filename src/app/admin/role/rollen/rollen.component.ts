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
  styleUrls: ['./rollen.component.scss', '../../../app.component.scss', '../../admin_style.scss']
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

  //Haal alle laadkades op uit de database om weer te geven op de overzichtspagina
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

  //Filter toepassen als er input komt in het filtervak
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Navigeer naar de rol toevoegen pagina
  addRol() {
    this.route.navigate(['/addRol']);
  }

  //Verwijder een rol aan de hand van zijn id
  deleteRol(id: number) {
    this._adminService.deleteRole(id).subscribe(
      result => this.getRollen()
    );
  }

  //Ga naar de bewerk rol pagina, met de id als parameter
  editRol(id: number) {
    this.route.navigate(['/editRol'], { queryParams: { id }});
  }

}
