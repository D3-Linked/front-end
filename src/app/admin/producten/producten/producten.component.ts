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
  styleUrls: ['./producten.component.scss', '../../../app.component.scss']
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

  //Apply filter when input in filterform
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Navigate to add journalist page
  addProduct() {
    this.route.navigate(['/addProduct']);
  }

  //Delete a journalist from API, then get all journalists again for update page
  deleteProduct(id: number) {
    this._adminService.deleteProduct(id).subscribe(
      result => this.getProducten()
    );
  }

  editProduct(id: number) {
    this.route.navigate(['/editProduct'], { queryParams: { id }});
  }

}
