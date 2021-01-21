import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Levering } from 'src/app/models/levering.model';

@Component({
  selector: 'app-edit-levering',
  templateUrl: './edit-levering.component.html',
  styleUrls: ['./edit-levering.component.scss']
})
export class EditLeveringComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  editLeveringForm = this.fb.group({
    omschrijving: [''],
    laadkade: [''],
    schedule: [''],
    leverancier: [''],
    bedrijf: [''],
  })

  id: number = 0;
  levering: Levering;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findLevering();
    });
  }

  findLevering(){
    this._adminService.getLeveringById(this.id).subscribe(
      result => {
        this.levering = result;
      }
    );
  }

  onSubmit() {
    this._adminService.updateLevering(this.id, this.levering).subscribe();
    this.route.navigate(['/leveringen']);
  }

}
