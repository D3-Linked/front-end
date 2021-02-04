import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Levering } from 'src/app/models/levering.model';
import { Product } from 'src/app/models/product.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-eigen-planning',
  templateUrl: './eigen-planning.component.html',
  styleUrls: ['./eigen-planning.component.scss'],
})
export class EigenPlanningComponent implements OnInit {
  code: number = 0;
  nummerplaat: string = '';
  userLevering: Levering[] = [];
  producten: Product[];

  dbDatum: string;
  nowDatum: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private route: Router,
    private datePipe: DatePipe,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.code = params['code'];
      this.nummerplaat = params['nummerplaat'];
    });
    this.search();
  }

  search() {
    this._userService.getPlanning(this.code, this.nummerplaat).subscribe(
      (data) => {
        data.forEach((levering) => {
          this.dbDatum = this.datePipe.transform(
            new Date(levering.schedule.datum),
            'yyyy-MM-dd'
          );
          this.nowDatum = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

          if (this.dbDatum == this.nowDatum) {
            this.userLevering.push(levering);
          }
        });
      }
    );
  }
}
