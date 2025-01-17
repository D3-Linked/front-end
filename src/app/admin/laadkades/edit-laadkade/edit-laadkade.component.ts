import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Laadkade } from 'src/app/models/laadkade.model';

@Component({
  selector: 'app-edit-laadkade',
  templateUrl: './edit-laadkade.component.html',
  styleUrls: ['./edit-laadkade.component.scss', '../../admin_style.scss']
})
export class EditLaadkadeComponent implements OnInit {

  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router, private activatedRoute: ActivatedRoute) { }

  //Maak het formulier aan met de juiste validatie
  editLaadkadeForm = this.fb.group({
    nummer: ['', [Validators.min(0), Validators.required]],
    isBezet: ['']
  })

  id: number = 0;
  laadkade: Laadkade;
  isChecked = true;

  //Haal de parameter id uit de url en zoek de bijbehorende laadkade
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.findLaadkade();
    });
  }

  //haal de juiste laadkade uit de database
  findLaadkade(){
    this._adminService.getLaadkadeById(this.id).subscribe(
      result => {
        this.laadkade = result;
      }
    );
  }

  //Als het bewerk formulier ingediend wordt
  //Update de laadkade in de database en ga terug naar de overzichtspagina
  onSubmit() {
    this.laadkade.nummer = parseInt(this.editLaadkadeForm.value['nummer']);
    this._adminService.updateLaadkade(this.id, this.laadkade).subscribe();
    this.route.navigate(['/laadkades']);
  }

}
