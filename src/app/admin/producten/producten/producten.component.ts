import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-producten',
  templateUrl: './producten.component.html',
  styleUrls: ['./producten.component.scss', '../../../app.component.scss', '../../admin_style.scss']
})
export class ProductenComponent implements OnInit {

  producten: Product[];
  displayedColumns: string[] = ['naam', 'levering', 'deleteProduct'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getProducten();
  }

  //Haal alle producten op uit de database om weer te geven op de overzichtspagina
  getProducten() {
    this._adminService.getProducten().subscribe(
      result => {
        this.producten = result;
        this.dataSource = new MatTableDataSource(this.producten);
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

  //Navigeer naar de product toevoegen pagina
  addProduct() {
    this.route.navigate(['/addProduct']);
  }

  //Verwijder een product aan de hand van zijn id
  deleteProduct(id: number) {
    this._adminService.deleteProduct(id).subscribe(
      result => this.getProducten()
    );
  }

  //Ga naar de bewerk product pagina, met de id als parameter
  editProduct(id: number) {
    this.route.navigate(['/editProduct'], { queryParams: { id }});
  }

}
