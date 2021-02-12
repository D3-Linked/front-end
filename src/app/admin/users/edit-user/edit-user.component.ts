import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss', '../../admin_style.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  rollen: Role[];

  //Maak het formulier aan met de juiste validatie
  editGebruikerForm = this.fb.group({
    naam: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    roleID: ['', Validators.required]
  })

  id: number = 0;
  gebruiker: User;
  rol: Role;

  //Haal de parameter id uit de url en zoek de bijbehorende laadkade
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findGebruiker();
      this.getRoles();
    });
  }

  //haal de juiste gebruiker uit de database
  findGebruiker(){
    this._adminService.getUserById(this.id).subscribe(
      result => {
        this.gebruiker = result;
      }
    );
  }

  //haal alle rollen uit de database
  getRoles(){
    this._adminService.getRoles().subscribe(result => {
      this.rollen = result;
    })
  }

  //haal de juiste rol uit de database
  getRol(id:number){
    this._adminService.getRoleById(id).subscribe(result => {
      this.rol = result;
    });
    return this.rol;
  }

  //Als het bewerk formulier ingediend wordt
  //Update de user in de database en ga terug naar de overzichtspagina
  onSubmit() {
    this.gebruiker.rol = this.getRol(this.gebruiker.roleID);
    console.log(this.gebruiker);
    this._adminService.updateUser(this.id, this.gebruiker).subscribe();
    this.route.navigate(['/users']);
  }

}
