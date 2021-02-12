import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss', '../../admin_style.scss']
})
export class AddRolComponent implements OnInit {

  //Maak het formulier aan met de juiste validatie
  addRolForm = this.fb.group({
    naam: ['', [Validators.required, Validators.minLength(2)]],
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  //als het formulier ingediend wordt ->
    //rol toevoegen via de admin service &&
    //terug navigeren naar de roles overzicht pagina
  onSubmit() {
    this._adminService.addRole(this.addRolForm.value).subscribe();
    this.route.navigate(['/roles']);
  }
}
