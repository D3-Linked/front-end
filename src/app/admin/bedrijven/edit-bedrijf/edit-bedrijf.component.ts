import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Bedrijf } from 'src/app/models/bedrijf.model';

@Component({
  selector: 'app-edit-bedrijf',
  templateUrl: './edit-bedrijf.component.html',
  styleUrls: ['./edit-bedrijf.component.scss']
})
export class EditBedrijfComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  editBedrijfForm = this.fb.group({
    naam: [''],
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
