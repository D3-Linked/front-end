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
  addBedrijfForm = this.fb.group({
    naam: ['', [Validators.minLength(2), Validators.required]],
    email: ['', [Validators.minLength(2), Validators.required]],
    adres: ['', [Validators.minLength(2), Validators.required]],
    btwNummer: ['', [Validators.minLength(2), Validators.required]],
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._adminService.addBedrijf(this.addBedrijfForm.value).subscribe();
    this.route.navigate(['/bedrijven']);
  }
}
