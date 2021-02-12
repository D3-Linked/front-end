import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss', '../../admin_style.scss']
})
export class AddUserComponent implements OnInit {

  //Maak het formulier aan met de juiste validatie
  addGebruikerForm = this.fb.group({
    naam: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    paswoord: ['', [Validators.required, Validators.minLength(5)]],
    token: null,
    roleID: ['', Validators.required]
  })

  rollen: Role[];
  selectedRol: number;

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getRollen();
  }

  //haal alle rollen op uit de admin service voor de dropdown in het formulier
  getRollen(){
    this._adminService.getRoles().subscribe(result => {
      this.rollen = result;
    })
  }

  //als het formulier ingediend wordt ->
    //
    //rol toevoegen via de admin service &&
    //terug navigeren naar de bedrijven overzicht pagina
  onSubmit() {
    this.addGebruikerForm.value["roleID"] = parseInt(this.addGebruikerForm.value["roleID"]);

    this._adminService.addUser(this.addGebruikerForm.value).subscribe();
    this.route.navigate(['/users']);
  }

}
