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
  styleUrls: ['./leveranciers.component.scss', '../../../app.component.scss']
})
export class LeveranciersComponent implements OnInit {
  leveranciers: Leverancier[];
  displayedColumns: string[] = ['code', 'bedrijf', 'deleteLeverancier'];
  dataSource: MatTableDataSource<Leverancier>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getLeveranciers();
  }

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addLeverancier() {
    this.route.navigate(['/addLeverancier']);
  }

  deleteLeverancier(id: number) {
    this._adminService.deleteLeverancier(id).subscribe(
      result => this.getLeveranciers()
    );
  }

  editLeverancier(id: number) {
    this.route.navigate(['/editLeverancier'], { queryParams: { id }});
  }
}
