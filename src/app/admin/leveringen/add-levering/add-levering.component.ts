import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from 'src/app/models/schedule.model';
import { Laadkade } from 'src/app/models/laadkade.model';
import { Leverancier } from 'src/app/models/leverancier.model';

@Component({
  selector: 'app-add-levering',
  templateUrl: './add-levering.component.html',
  styleUrls: ['./add-levering.component.scss'],
})
export class AddLeveringComponent implements OnInit {
  schedules: Schedule[];
  laadkades: Laadkade[];
  leveranciers: Leverancier[];

  selectedSchedule: number;
  selectedLaadkade: number;
  selectedLeverancier: number;

  schedule: Schedule = new Schedule(0, 0, new Date(), '', 1, null);

  addLeveringForm = this.fb.group({
    omschrijving: [''],
    laadkadeID: [''],
    scheduleID: [''],
    leverancierID: [''],
  });

  constructor(
    private fb: FormBuilder,
    private _adminService: AdminService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['scheduleID'] != null){
        this.selectedSchedule = params['scheduleID'];
        this._adminService.getScheduleById(this.selectedSchedule).subscribe(result => {
          this.schedule = result;
        })
      }
    });
    this.loadData();
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

  onSubmit() {
    this.addLeveringForm.value["laadkadeID"] = parseInt(this.addLeveringForm.value["laadkadeID"]);
    this.addLeveringForm.value["scheduleID"] = parseInt(this.addLeveringForm.value["scheduleID"]);
    this.addLeveringForm.value["leverancierID"] = parseInt(this.addLeveringForm.value["leverancierID"]);

    this._adminService.addLevering(this.addLeveringForm.value).subscribe();
    this.route.navigate(['/leveringen']);
  }
}
