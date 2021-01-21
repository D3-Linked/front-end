import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Laadkade } from 'src/app/models/laadkade.model';

@Component({
  selector: 'app-edit-laadkade',
  templateUrl: './edit-laadkade.component.html',
  styleUrls: ['./edit-laadkade.component.scss']
})
export class EditLaadkadeComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }
  isChecked = true;
  editLaadkadeForm = this.fb.group({
    nummer: [''],
    isBezet: ['']
  })

  id: number = 0;
  laadkade: Laadkade;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findLaadkade();
    });
  }

  findLaadkade(){
    this._adminService.getLaadkadeById(this.id).subscribe(
      result => {
        this.laadkade = result;
      }
    );
  }

  onSubmit() {
    this.laadkade.nummer = parseInt(this.editLaadkadeForm.value['nummer']);
    this._adminService.updateLaadkade(this.id, this.laadkade).subscribe();
    this.route.navigate(['/laadkades']);
  }

}
