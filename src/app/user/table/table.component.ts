import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {UserService} from '../user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit(): void {

    
  }

}
