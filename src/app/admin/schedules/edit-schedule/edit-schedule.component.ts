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

  editScheduleForm = this.fb.group({
    code: 0,
    datum: ['', Validators.required],
    opmerking: [''],
    userID: JSON.parse(localStorage.getItem('LoggedUser')).userID
  });

  id: number = 0;

  schedule: Schedule;
  user: User;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
      this.findSchedule();
      this.getUsers();
    });
  }

  getUsers() {
    this._adminService.getUsers().subscribe((result) => {
      this.users = result;
    });
  }

  findSchedule() {
    this._adminService.getScheduleById(this.id).subscribe((result) => {
      this.schedule = result;
    });
  }

  getUser(id:number){
    this._adminService.getUserById(id).subscribe(result => {
      this.user = result;
    });
    return this.user;
  }

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
