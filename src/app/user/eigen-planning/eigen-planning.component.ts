import { Component, OnInit } from '@angular/core';
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
  nummerplaat: string= "";
  userLevering: Levering;
  producten: Product[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private route: Router
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
        console.log(data);
        data.forEach(levering => {
          console.log(levering);
          console.log("datum database");
          console.log(new Date(levering.schedule.datum).getDate());
          console.log("datum now");
          console.log(new Date().getDate());
          if (levering.schedule.datum.getDate() == new Date().getDate()){
            console.log("today!");
          }
        });

        this.userLevering = data[0];
        this.loadProducts(this.userLevering.leveringID);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  loadProducts(id: number){
    this._userService.getProductenByLeveringId(id).subscribe(result =>{
      this.producten = result;
    })
  }
}
