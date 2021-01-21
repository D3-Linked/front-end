import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { Leverancier } from 'src/app/models/leverancier.model';

@Component({
  selector: 'app-edit-leverancier',
  templateUrl: './edit-leverancier.component.html',
  styleUrls: ['./edit-leverancier.component.scss']
})
export class EditLEverancierComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  bedrijven : Bedrijf[] = null;

  editLeverancierForm = this.fb.group({
    code: [''],
    bedrijfID: [''], 
    bedrijf: ['']
  })

  id: number = 0;
  leverancier: Leverancier;
  bedrijf: Bedrijf;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getBedrijven();
      this.findLeverancier();
    });
  }

  getBedrijven(){
    this._adminService.getBedrijven().subscribe(
      result => {
        this.bedrijven = result;
      }
    );
  }

  getBedrijf(id:number){
    this._adminService.getBedrijfById(id).subscribe(
      result => {
        this.bedrijf = result;
      }
    );
    return this.bedrijf;
  }

  findLeverancier(){
    this._adminService.getLeverancierById(this.id).subscribe(
      result => {
        this.leverancier = result;
      }
    );
  }

  onSubmit() {
    this.leverancier.bedrijf = this.getBedrijf(this.leverancier.bedrijfID);
    console.log(this.leverancier);
    this._adminService.updateLeverancier(this.id, this.leverancier).subscribe();
    this.route.navigate(['/leveranciers']);
  }
}