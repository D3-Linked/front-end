import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Bedrijf } from '../../../models/bedrijf.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-leverancier',
  templateUrl: './add-leverancier.component.html',
  styleUrls: ['./add-leverancier.component.scss', '../../admin_style.scss']
})
export class AddLeverancierComponent implements OnInit {

  bedrijven : Bedrijf[] = null;

  selectedValue:string;

  addLeverancierForm = this.fb.group({
    code: ['', [Validators.required, Validators.min(0)]],
    nummerplaat: ['', [Validators.required, Validators.minLength(6)]],
    bedrijfID: ['', Validators.required]
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getBedrijven();
  }

  getBedrijven(){
    this._adminService.getBedrijven().subscribe(result => {
      this.bedrijven = result;
    });
  }

  onSubmit() {
    //this.addLeverancierForm.value['bedrijf'] = this._adminService.getBedrijfById(this.addLeverancierForm.value['bedrijfID']);
    //console.log(this.addLeverancierForm.value);
    this.addLeverancierForm.value["code"] = parseInt(this.addLeverancierForm.value["code"]);
    this.addLeverancierForm.value["bedrijfID"] = parseInt(this.addLeverancierForm.value["bedrijfID"]);
    this._adminService.addLeverancier(this.addLeverancierForm.value).subscribe();
    this.route.navigate(['/leveranciers']);
  }
}
