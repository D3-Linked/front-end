import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-laadkade',
  templateUrl: './add-laadkade.component.html',
  styleUrls: ['./add-laadkade.component.scss']
})
export class AddLaadkadeComponent implements OnInit {

  addLaadkadeForm = this.fb.group({
    nummer: [''],
    isBezet: false
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.addLaadkadeForm.value["nummer"] = parseInt(this.addLaadkadeForm.value["nummer"]);
    this._adminService.addLaadkade(this.addLaadkadeForm.value).subscribe();
    this.route.navigate(['/laadkades']);
  }

}
