import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { Leverancier } from 'src/app/models/leverancier.model';

@Component({
  selector: 'app-edit-leverancier',
  templateUrl: './edit-leverancier.component.html',
  styleUrls: ['./edit-leverancier.component.scss', '../../admin_style.scss']
})
export class EditLEverancierComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  //Maak het formulier aan met de juiste validatie
  editLeverancierForm = this.fb.group({
    code: ['', [Validators.required, Validators.min(0)]],
    nummerplaat: ['',[Validators.required, Validators.minLength(6)]],
    bedrijfID: ['', Validators.required],
    bedrijf: ['']
  })

  id: number = 0;
  leverancier: Leverancier;
  bedrijf: Bedrijf;
  bedrijven : Bedrijf[] = null;

  //Haal de parameter id uit de url en zoek de bijbehorende leverancier
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.getBedrijven();
      this.findLeverancier();
    });
  }

  //Haal alle bedrijven uit de database voor de dropdown in het formulier
  getBedrijven(){
    this._adminService.getBedrijven().subscribe(
      result => {
        this.bedrijven = result;
      }
    );
  }

  //haal het juiste bedrijf uit de database
  getBedrijf(id:number){
    this._adminService.getBedrijfById(id).subscribe(
      result => {
        this.bedrijf = result;
      }
    );
    return this.bedrijf;
  }

  //haal de juiste leverancier uit de database
  findLeverancier(){
    this._adminService.getLeverancierById(this.id).subscribe(
      result => {
        this.leverancier = result;
      }
    );
  }

  //Als het bewerk formulier ingediend wordt
  //Update de leverancier in de database en ga terug naar de overzichtspagina
  onSubmit() {
    this.leverancier.bedrijf = this.getBedrijf(this.leverancier.bedrijfID);
    console.log(this.leverancier);
    this._adminService.updateLeverancier(this.id, this.leverancier).subscribe();
    this.route.navigate(['/leveranciers']);
  }
}
