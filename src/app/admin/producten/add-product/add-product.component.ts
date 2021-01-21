import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';
import { Levering } from 'src/app/models/levering.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm = this.fb.group({
    naam: [''],
    leveringID: ['']
  })

  leveringen: Levering[];
  selectedLevering: number;

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
    this.getLeveringen();
  }

  getLeveringen(){
    this._adminService.getLeveringen().subscribe(result => {
      this.leveringen = result;
    })
  }

  onSubmit() {
    this.addProductForm.value["leveringID"] = parseInt(this.addProductForm.value["leveringID"]);

    this._adminService.addProduct(this.addProductForm.value).subscribe();
    this.route.navigate(['/producten']);
  }

}
