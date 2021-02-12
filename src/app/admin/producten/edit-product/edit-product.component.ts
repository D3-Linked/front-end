import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { Levering } from 'src/app/models/levering.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss', '../../admin_style.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  leveringen: Levering[];

  //Maak het formulier aan met de juiste validatie
  editProductForm = this.fb.group({
    naam: ['', [Validators.required, Validators.minLength(2)]],
    leveringID: ['', Validators.required]
  })

  id: number = 0;
  product: Product;
  levering: Levering;

  //Haal de parameter id uit de url en zoek het bijbehorende product
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findProduct();
      this.getLeveringen();
    });
  }

  //haal het juiste product uit de database
  findProduct(){
    this._adminService.getProductById(this.id).subscribe(
      result => {
        this.product = result;
      }
    );
  }

  //haal alle leveringen uit de database
  getLeveringen(){
    this._adminService.getLeveringen().subscribe(result => {
      this.leveringen = result;
    })
  }

  //haal de juiste levering uit de database
  getLevering(id:number){
    this._adminService.getLeveringById(id).subscribe(result => {
      this.levering = result;
    });
    return this.levering;
  }

  //Als het bewerk formulier ingediend wordt
  //Update het product in de database en ga terug naar de overzichtspagina
  onSubmit() {
    this.product.levering = this.getLevering(this.product.leveringID);
    console.log(this.product);
    this._adminService.updateProduct(this.id, this.product).subscribe();
    this.route.navigate(['/producten']);
  }

}
