import { Component, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild("grid") grid: MatGridList;

  gridByBreakpoint = {
    xl: 8,
    lg: 6,
    md: 4,
    sm: 2,
    xs: 1
  }

  constructor() { }

  ngOnInit(): void {
  }
}
