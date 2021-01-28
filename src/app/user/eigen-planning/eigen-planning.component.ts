import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Levering } from 'src/app/models/levering.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-eigen-planning',
  templateUrl: './eigen-planning.component.html',
  styleUrls: ['./eigen-planning.component.scss']
})
export class EigenPlanningComponent implements OnInit {
  id: number = 0;
  userLevering: Levering;
  constructor(private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private route: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params['id'];
    });
    this.search();
  }

  search(){
    this._userService.getPlanning(this.id)
    .subscribe(
      data => {
        this.userLevering = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
}

}
