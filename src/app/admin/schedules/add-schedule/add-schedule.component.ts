import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.scss']
})
export class AddScheduleComponent implements OnInit {

  addScheduleForm = this.fb.group({
    code: 0,
    datum: [''],
    opmerking: [''],
    userID: JSON.parse(localStorage.getItem('LoggedUser')).userID
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.addScheduleForm.value["code"] = parseInt(this.addScheduleForm.value["code"]);
    this.addScheduleForm.value["userID"] = parseInt(this.addScheduleForm.value["userID"]);
    this.addScheduleForm.value["datum"] = new Date(this.addScheduleForm.value["datum"]);

    console.log(this.addScheduleForm.value);
    this._adminService.addSchedule(this.addScheduleForm.value).subscribe();
    this.route.navigate(['/schedules']);
  }

}
