import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bedrijf',
  templateUrl: './add-bedrijf.component.html',
  styleUrls: ['./add-bedrijf.component.scss', '../../admin_style.scss']
})
export class AddBedrijfComponent implements OnInit {
  //Maak het formulier aan met de juiste validatie
  addBedrijfForm = this.fb.group({
    naam: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.minLength(2), Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    adres: ['', [Validators.minLength(6), Validators.required]],
    btwNummer: ['', [Validators.minLength(14), Validators.required]],
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  //als het formulier ingediend wordt ->
    //bedrijf toevoegen via de admin service &&
    //terug navigeren naar de bedrijven overzicht pagina
  onSubmit() {
    this._adminService.addBedrijf(this.addBedrijfForm.value).subscribe();
    this.route.navigate(['/bedrijven']);
  }
}
