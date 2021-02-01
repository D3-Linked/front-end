import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { UserService } from '../user.service';
declare var Jquery: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() {
    
  }

  ngOnInit(): void {
    if (!localStorage.getItem('reload')) { 
      localStorage.setItem('reload', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('reload') 
    }
  }

  reload(){
    location.reload();
  }

}
