import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Leverancier } from '../../../models/leverancier.model';

@Component({
  selector: 'app-leveranciers',
  templateUrl: './leveranciers.component.html',
  styleUrls: ['./leveranciers.component.scss', '../../../app.component.scss', '../../admin_style.scss']
})
export class LeveranciersComponent implements OnInit {
  leveranciers: Leverancier[];
  displayedColumns: string[] = ['code', 'nummerplaat', 'bedrijf', 'deleteLeverancier'];
  dataSource: MatTableDataSource<Leverancier>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getLeveranciers();
  }

  //Haal alle leveranciers op uit de database om weer te geven op de overzichtspagina
  getLeveranciers() {
    this._adminService.getLeveranciers().subscribe(
      result => {
        this.leveranciers = result;
        this.dataSource = new MatTableDataSource(this.leveranciers);
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

  //Navigeer naar de leverancier toevoegen pagina
  addLeverancier() {
    this.route.navigate(['/addLeverancier']);
  }

  //Verwijder een leverancier aan de hand van zijn id
  deleteLeverancier(id: number) {
    this._adminService.deleteLeverancier(id).subscribe(
      result => this.getLeveranciers()
    );
  }

  //Ga naar de bewerk leverancier pagina, met de id als parameter
  editLeverancier(id: number) {
    this.route.navigate(['/editLeverancier'], { queryParams: { id }});
  }
}
