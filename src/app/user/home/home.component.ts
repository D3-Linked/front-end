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
  public nummerplaat: string;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }
  goTo(code: number, nummerplaat: string) {
    this.route.navigate(['/userlevering'], { queryParams: { code, nummerplaat }});
  }

}



