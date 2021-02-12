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
  styleUrls: ['./bedrijven.component.scss', '../../../app.component.scss', '../../admin_style.scss']
})
export class BedrijvenComponent implements OnInit {
  bedrijven: Bedrijf[];
  displayedColumns: string[] = ['naam', 'adres', 'btwNummer', 'email', 'deleteBedrijf'];
  dataSource: MatTableDataSource<Bedrijf>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getBedrijven();
  }

  //Haal alle bedrijven op uit de database om weer te geven op de overzichtspagina
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

  //Filter toepassen als er input komt in het filtervak
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Navigeer naar de bedrijf toevoegen pagina
  addBedrijf() {
    this.route.navigate(['/addBedrijf']);
  }

  //Verwijder een bedrijf aan de hand van zijn id
  deleteBedrijf(id: number) {
    this._adminService.deleteBedrijf(id).subscribe(
      result => this.getBedrijven()
    );
  }

  //Ga naar de bewerk bedrijf pagina, met de id als parameter
  editBedrijf(id: number) {
    this.route.navigate(['/editBedrijf'], { queryParams: { id }});
  }

}
