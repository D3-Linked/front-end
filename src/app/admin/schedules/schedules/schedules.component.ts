import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Router } from '@angular/router';

import { Schedule } from '../../../models/schedule.model';
import { Levering } from 'src/app/models/levering.model';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class SchedulesComponent implements OnInit {
  schedules: Schedule[];
  displayedColumns: string[] = [
    'code',
    'datum',
    'opmerking',
    'creator',
    'deleteSchedule',
  ];
  dataSource: MatTableDataSource<Schedule>;
  expandedElement: Schedule | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _adminService: AdminService, private route: Router) {}

  leveringen: Levering[] = null;
  id: number;

  ngOnInit(): void {
    this.getSchedules();
  }

  getSchedules() {
    this._adminService.getSchedules().subscribe((result) => {
      this.schedules = result;
      this.dataSource = new MatTableDataSource(this.schedules);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  getLeveringenByScheduleID(id: number) {
    if (this.leveringen == null && id != this.id) {
      this._adminService.getLeveringenByScheduleId(id).subscribe((result) => {
        this.leveringen = result;
      });
    }
    this.id = id;
    return this.leveringen;
  }

  //Apply filter when input in filterform
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addSchedule() {
    this.route.navigate(['/addSchedule']);
  }

  deleteSchedule(id: number) {
    this._adminService
      .deleteSchedule(id)
      .subscribe((result) => this.getSchedules());
  }

  editSchedule(id: number) {
    this.route.navigate(['/editSchedule'], { queryParams: { id } });
  }
}
