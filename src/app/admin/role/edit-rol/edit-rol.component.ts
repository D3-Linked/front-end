import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.scss']
})
export class EditRolComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  editRolForm = this.fb.group({
    naam: [''],
  })

  id: number = 0;
  rol: Role;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findRol();
    });
  }

  findRol(){
    this._adminService.getRoleById(this.id).subscribe(
      result => {
        this.rol = result;
      }
    );
  }

  onSubmit() {
    this._adminService.updateRole(this.id, this.rol).subscribe();
    this.route.navigate(['/roles']);
  }


}
