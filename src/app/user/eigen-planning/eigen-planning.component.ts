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
  id: number = 0;
  userLevering: Levering;
  producten: Product[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private route: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.search();
  }

  search() {
    this._userService.getPlanning(this.id).subscribe(
      (data) => {
        this.userLevering = data[0];
        console.log(data[0]);
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
