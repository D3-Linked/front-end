import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';

import { Schedule } from 'src/app/models/schedule.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss', '../../admin_style.scss']
})
export class EditScheduleComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _adminService: AdminService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  users: User[];

  //Maak het formulier aan met de juiste validatie
  editScheduleForm = this.fb.group({
    code: 0,
    datum: ['', Validators.required],
    opmerking: [''],
    userID: JSON.parse(localStorage.getItem('LoggedUser')).userID
  });

  id: number = 0;

  schedule: Schedule;
  user: User;

  //Haal de parameter id uit de url en zoek de bijbehorende schedule
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.findSchedule();
      this.getUsers();
    });
  }

  //haal alle users uit de database
  getUsers() {
    this._adminService.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  //haal de juiste schedule uit de database
  findSchedule() {
    this._adminService.getScheduleById(this.id).subscribe((result) => {
      this.schedule = result;
    });
  }

  //haal de juiste user uit de database
  getUser(id:number){
    this._adminService.getUserById(id).subscribe(result => {
      this.user = result;
    });
    return this.user;
  }

  //Als het bewerk formulier ingediend wordt
  //Update de schedule in de database en ga terug naar de overzichtspagina
  onSubmit() {
    this.schedule.user = this.getUser(this.schedule.userID);
    this.schedule.code = parseInt(this.editScheduleForm.value["code"]);
    this.schedule.userID = parseInt(this.editScheduleForm.value["userID"]);

    //add one hour to the date (timezone conversion)
     this.schedule.datum = new Date(new Date(this.schedule.datum).setHours(new Date(this.schedule.datum).getHours() + 1));

    this._adminService.updateSchedule(this.id, this.schedule).subscribe();
    this.route.navigate(['/schedules']);
  }
}
