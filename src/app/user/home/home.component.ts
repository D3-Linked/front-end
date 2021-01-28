import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  public code: number;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  goTo(id: number) {
    this.route.navigate(['/userlevering'], { queryParams: { id }});
  }
  
}



