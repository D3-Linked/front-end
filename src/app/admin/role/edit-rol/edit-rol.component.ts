import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.scss', '../../admin_style.scss']
})
export class EditRolComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  //Maak het formulier aan met de juiste validatie
  editRolForm = this.fb.group({
    naam: ['', [Validators.required, Validators.minLength(2)]],
  })

  id: number = 0;
  rol: Role;

  //Haal de parameter id uit de url en zoek de bijbehorende rol
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findRol();
    });
  }

  //haal de juiste rol uit de database
  findRol(){
    this._adminService.getRoleById(this.id).subscribe(
      result => {
        this.rol = result;
      }
    );
  }

  //Als het bewerk formulier ingediend wordt
  //Update de rol in de database en ga terug naar de overzichtspagina
  onSubmit() {
    this._adminService.updateRole(this.id, this.rol).subscribe();
    this.route.navigate(['/roles']);
  }


}
