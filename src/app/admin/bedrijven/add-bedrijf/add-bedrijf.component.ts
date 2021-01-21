import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-bedrijf',
  templateUrl: './add-bedrijf.component.html',
  styleUrls: ['./add-bedrijf.component.scss']
})
export class AddBedrijfComponent implements OnInit {
  addBedrijfForm = this.fb.group({
    naam: [''],
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._adminService.addBedrijf(this.addBedrijfForm.value).subscribe();
    this.route.navigate(['/bedrijven']);
  }
}
