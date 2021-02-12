import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Levering } from 'src/app/models/levering.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss', '../../admin_style.scss']
})
export class AddProductComponent implements OnInit {

  //Maak het formulier aan met de juiste validatie
  addProductForm = this.fb.group({
    naam: ['', [Validators.required, Validators.minLength(2)]],
    leveringID: ['', Validators.required]
  })

  leveringen: Levering[];
  selectedLevering: number;
  levering: Levering;

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  //haal de levering id uit de url parameters op &&
    //en haal de levering met die id op uit de admin service
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['leveringID'] != null){
        this.selectedLevering = params['leveringID'];
        this._adminService.getLeveringById(this.selectedLevering).subscribe(result => {
          this.levering = result;
        })
      }
    });
    this.getLeveringen();
  }

  //haal alle leveringen op voor de dropdown in het formulier
  getLeveringen(){
    this._adminService.getLeveringen().subscribe(result => {
      this.leveringen = result;
    })
  }

  //als het formulier ingediend wordt ->
    //zet de levering id die van het formulier komt om naar een nummer ipv een string
    //product toevoegen via de admin service &&
    //terug navigeren naar de producten overzicht pagina
  onSubmit() {
    this.addProductForm.value["leveringID"] = parseInt(this.addProductForm.value["leveringID"]);

    this._adminService.addProduct(this.addProductForm.value).subscribe();
    this.route.navigate(['/producten']);
  }

}
