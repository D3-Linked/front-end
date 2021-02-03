import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Bedrijf } from 'src/app/models/bedrijf.model';

@Component({
  selector: 'app-edit-bedrijf',
  templateUrl: './edit-bedrijf.component.html',
  styleUrls: ['./edit-bedrijf.component.scss', '../../admin_style.scss']
})
export class EditBedrijfComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  editBedrijfForm = this.fb.group({
    naam: ['', [Validators.minLength(5), Validators.required]],
    email: ['', [Validators.minLength(6), Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    adres: ['', [Validators.minLength(6), Validators.required]],
    btwNummer: ['', [Validators.minLength(14), Validators.required]],
  })

  id: number = 0;
  bedrijf: Bedrijf;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findBedrijf();
    });
  }

  findBedrijf(){
    this._adminService.getBedrijfById(this.id).subscribe(
      result => {
        this.bedrijf = result;
      }
    );
  }

  onSubmit() {
    this._adminService.updateBedrijf(this.id, this.bedrijf).subscribe();
    this.route.navigate(['/bedrijven']);
  }

}
