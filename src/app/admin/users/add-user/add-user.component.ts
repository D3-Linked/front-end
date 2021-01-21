import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addGebruikerForm = this.fb.group({
    naam: [''],
    email: [''],
    paswoord: [''],
    token: null,
    roleID: ['']
  })

  rollen: Role[];
  selectedRol: number;

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getRollen();
  }

  getRollen(){
    this._adminService.getRoles().subscribe(result => {
      this.rollen = result;
    })
  }

  onSubmit() {
    this.addGebruikerForm.value["roleID"] = parseInt(this.addGebruikerForm.value["roleID"]);
    console.log(this.addGebruikerForm.value);
    this._adminService.addUser(this.addGebruikerForm.value).subscribe();
    this.route.navigate(['/users']);
  }

}
