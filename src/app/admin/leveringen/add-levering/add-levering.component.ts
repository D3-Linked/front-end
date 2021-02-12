import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';
import { Schedule } from 'src/app/models/schedule.model';
import { Laadkade } from 'src/app/models/laadkade.model';
import { Leverancier } from 'src/app/models/leverancier.model';

@Component({
  selector: 'app-add-levering',
  templateUrl: './add-levering.component.html',
  styleUrls: ['./add-levering.component.scss', '../../admin_style.scss'],
})
export class AddLeveringComponent implements OnInit {
  schedules: Schedule[];
  laadkades: Laadkade[];
  leveranciers: Leverancier[];

  selectedSchedule: number;
  selectedLaadkade: number;
  selectedLeverancier: number;

  //Maak het formulier aan met de juiste validatie
  addLeveringForm = this.fb.group({
    omschrijving: ['', [Validators.required, Validators.minLength(2)]],
    laadkadeID: ['', Validators.required],
    scheduleID: ['', Validators.required],
    leverancierID: ['', Validators.required],
    isCompleet: false
  });

  constructor(
    private fb: FormBuilder,
    private _adminService: AdminService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  //haal de laadkades, schedules en leveranciers op voor de dropdowns in het formulier
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

  //als het formulier ingediend wordt ->
    //zet de laadkade id, schedule id en leverancier id die van het formulier komen om naar een nummer ipv een string
    //levering toevoegen via de admin service &&
    //terug navigeren naar de leveringen overzicht pagina
  onSubmit() {
    this.addLeveringForm.value["laadkadeID"] = parseInt(this.addLeveringForm.value["laadkadeID"]);
    this.addLeveringForm.value["scheduleID"] = parseInt(this.addLeveringForm.value["scheduleID"]);
    this.addLeveringForm.value["leverancierID"] = parseInt(this.addLeveringForm.value["leverancierID"]);

    this._adminService.addLevering(this.addLeveringForm.value).subscribe();
    this.route.navigate(['/leveringen']);
  }
}
