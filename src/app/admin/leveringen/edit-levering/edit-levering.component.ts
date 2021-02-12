import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Levering } from 'src/app/models/levering.model';
import { Schedule } from 'src/app/models/schedule.model';
import { Laadkade } from 'src/app/models/laadkade.model';
import { Leverancier } from 'src/app/models/leverancier.model';

@Component({
  selector: 'app-edit-levering',
  templateUrl: './edit-levering.component.html',
  styleUrls: ['./edit-levering.component.scss', '../../admin_style.scss'],
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

  //Maak het formulier aan met de juiste validatie
  editLeveringForm = this.fb.group({
    omschrijving: ['', [Validators.required, Validators.minLength(2)]],
    laadkadeID: ['', Validators.required],
    scheduleID: ['', Validators.required],
    leverancierID: ['', Validators.required],
    isCompleet: ['']
  });

  id: number = 0;
  levering: Levering;

  laadkade: Laadkade;
  schedule: Schedule;
  leverancier: Leverancier;

  //Haal de parameter id uit de url en zoek de bijbehorende levering
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.findLevering();
      this.loadData();
    });
  }

  //haal de gegevens van laadkades, schedules en leveranciers uit de database
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

  //haal de juiste levering uit de database
  findLevering() {
    this._adminService.getLeveringById(this.id).subscribe((result) => {
      this.levering = result;
    });
  }

  //haal de juiste laadkade uit de database
  getLaadkade(id:number){
    this._adminService.getLaadkadeById(id).subscribe(result => {
      this.laadkade = result;
    });
    return this.laadkade;
  }

  //haal de juiste schedule uit de database
  getSchedule(id:number){
    this._adminService.getScheduleById(id).subscribe(result => {
      this.schedule = result;
    });
    return this.schedule;
  }

  //haal de juiste leverancier uit de database
  getLeverancier(id:number){
    this._adminService.getLeverancierById(id).subscribe(result => {
      this.leverancier = result;
    });
    return this.leverancier;
  }

  //Als het bewerk formulier ingediend wordt
  //Update de levering in de database en ga terug naar de overzichtspagina
  onSubmit() {
    this.levering.laadkade = this.getLaadkade(this.levering.laadkadeID);
    this.levering.schedule = this.getSchedule(this.levering.scheduleID);
    this.levering.leverancier = this.getLeverancier(this.levering.leverancierID);

    this._adminService.updateLevering(this.id, this.levering).subscribe();
    this.route.navigate(['/leveringen']);
  }
}
