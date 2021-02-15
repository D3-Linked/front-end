import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss', '../../admin_style.scss']
})
export class AddScheduleComponent implements OnInit {

  //Maak het formulier aan met de juiste validatie
  addScheduleForm = this.fb.group({
    code: 0,
    datum: ['', Validators.required],
    opmerking: [''],
    userID: JSON.parse(localStorage.getItem('LoggedUser')).userID
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  //als het formulier ingediend wordt ->
    //zet de code, user id die van het formulier komen om naar een nummer ipv een string &&
    //zet de datum om naar een datum object &&
    //bedrijf toevoegen via de admin service &&
    //terug navigeren naar de bedrijven overzicht pagina
  onSubmit() {
    this.addScheduleForm.value["code"] = parseInt(this.addScheduleForm.value["code"]);
    this.addScheduleForm.value["userID"] = parseInt(this.addScheduleForm.value["userID"]);

    //add one hour to the date (timezone conversion)
    this.addScheduleForm.value["datum"] = new Date(new Date(this.addScheduleForm.value["datum"]).setHours(new Date(this.addScheduleForm.value["datum"]).getHours() + 1));
    this.addScheduleForm.value["datum"] = new Date(new Date(this.addScheduleForm.value["datum"]).setMilliseconds(0));

    this._adminService.addSchedule(this.addScheduleForm.value).subscribe();
    this.route.navigate(['/schedules']);
  }

}
