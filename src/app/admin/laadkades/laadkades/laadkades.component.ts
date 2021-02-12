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

  //Haal alle laadkades op uit de database om weer te geven op de overzichtspagina
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

  //Filter toepassen als er input komt in het filtervak
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Navigeer naar de laadkade toevoegen pagina
  addLaadkade() {
    this.route.navigate(['/addLaadkade']);
  }

  //Verwijder een laadkade aan de hand van zijn id
  deleteLaadkade(id: number) {
    this._adminService.deleteLaadkade(id).subscribe(
      result => this.getLaadkades()
    );
  }

  //Ga naar de bewerk laadkade pagina, met de id als parameter
  editLaadkade(id: number) {
    this.route.navigate(['/editLaadkade'], { queryParams: { id }});
  }

}
