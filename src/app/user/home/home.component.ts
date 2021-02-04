import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/control-messages/validation.service';
import { Levering } from 'src/app/models/levering.model';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;

  dbDatum: string;
  nowDatum: string;
  userLevering: Levering[] = [];

  findLeveringenForm = this.fb.group({
    code: ['', [Validators.required, ValidationService.noNumber]],
    nummerplaat: ['', [Validators.required]]
  })

  constructor(private route: Router, private _userService: UserService, private snackbar: MatSnackBar, private datePipe: DatePipe, private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  goTo() {
    this._userService.getPlanning(this.findLeveringenForm.value['code'], this.findLeveringenForm.value['nummerplaat']).subscribe(result => {
      result.forEach((levering) => {
        this.dbDatum = this.datePipe.transform(
          new Date(levering.schedule.datum),
          'yyyy-MM-dd'
        );
        this.nowDatum = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

        if (this.dbDatum == this.nowDatum) {
          this.userLevering.push(levering);
        }
      });
      if ((this.userLevering.length == 0)) {
        this.snackbar.open('Geen leveringen gevonden voor u vandaag!', 'OK', {
          duration: 3500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }else{
        this.route.navigate(['/userlevering'], { queryParams: { code: this.findLeveringenForm.value['code'], nummerplaat: this.findLeveringenForm.value['nummerplaat'] }});
      }
    });
  }
}



