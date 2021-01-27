import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Levering } from 'src/app/models/levering.model';
import { Schedule } from 'src/app/models/schedule.model';
import { Laadkade } from 'src/app/models/laadkade.model';
import { Leverancier } from 'src/app/models/leverancier.model';

@Component({
  selector: 'app-edit-levering',
  templateUrl: './edit-levering.component.html',
  styleUrls: ['./edit-levering.component.scss'],
})
export class EditLeveringComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _adminService: AdminService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  schedules: Schedule[];
  laadkades: Laadkade[];
  leveranciers: Leverancier[];

  editLeveringForm = this.fb.group({
    omschrijving: [''],
    laadkadeID: [''],
    scheduleID: [''],
    leverancierID: [''],
  });

  id: number = 0;
  levering: Levering;

  laadkade: Laadkade;
  schedule: Schedule;
  leverancier: Leverancier;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.findLevering();
      this.loadData();
    });
  }

  loadData() {
    this._adminService.getLaadkades().subscribe((result) => {
      this.laadkades = result;
    });
    this._adminService.getSchedules().subscribe((result) => {
      this.schedules = result;
    });
    this._adminService.getLeveranciers().subscribe((result) => {
      this.leveranciers = result;
    });
  }

  findLevering() {
    this._adminService.getLeveringById(this.id).subscribe((result) => {
      this.levering = result;
    });
  }

  getLaadkade(id:number){
    this._adminService.getLaadkadeById(id).subscribe(result => {
      this.laadkade = result;
    });
    return this.laadkade;
  }

  getSchedule(id:number){
    this._adminService.getScheduleById(id).subscribe(result => {
      this.schedule = result;
    });
    return this.schedule;
  }

  getLeverancier(id:number){
    this._adminService.getLeverancierById(id).subscribe(result => {
      this.leverancier = result;
    });
    return this.leverancier;
  }

  onSubmit() {
    this.levering.laadkade = this.getLaadkade(this.levering.laadkadeID);
    this.levering.schedule = this.getSchedule(this.levering.scheduleID);
    this.levering.leverancier = this.getLeverancier(this.levering.leverancierID);

    console.log(this.levering);
    this._adminService.updateLevering(this.id, this.levering).subscribe();
    this.route.navigate(['/leveringen']);
  }
}
