import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss']
})
export class AddRolComponent implements OnInit {

  addRolForm = this.fb.group({
    naam: [''],
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._adminService.addRole(this.addRolForm.value).subscribe();
    this.route.navigate(['/roles']);
  }
}
