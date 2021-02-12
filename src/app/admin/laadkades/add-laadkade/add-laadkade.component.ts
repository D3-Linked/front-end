import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-laadkade',
  templateUrl: './add-laadkade.component.html',
  styleUrls: ['./add-laadkade.component.scss', '../../admin_style.scss']
})
export class AddLaadkadeComponent implements OnInit {

  addLaadkadeForm = this.fb.group({
    nummer: ['', [Validators.min(0), Validators.required]],
    isBezet: false
  })
  constructor(private fb: FormBuilder, private _adminService: AdminService, private route: Router) { }

  ngOnInit(): void {
  }

  //als het formulier ingediend wordt ->
    //zet de laadkade nummer die van het formulier komt om naar een nummer ipv een string
    //laadkade toevoegen via de admin service &&
    //terug navigeren naar de laadkades overzicht pagina
  onSubmit() {
    this.addLaadkadeForm.value["nummer"] = parseInt(this.addLaadkadeForm.value["nummer"]);
    this._adminService.addLaadkade(this.addLaadkadeForm.value).subscribe();
    this.route.navigate(['/laadkades']);
  }

}
