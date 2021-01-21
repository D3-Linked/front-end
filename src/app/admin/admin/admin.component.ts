import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

    //Navigate to journalists page
    toBedrijven() {
      this.route.navigate(['/bedrijven']);
    }
    toLaadkades() {
      this.route.navigate(['/laadkades']);
    }
    toLeveranciers() {
      this.route.navigate(['/leveranciers']);
    }
    toLeveringen() {
      this.route.navigate(['/leveringen']);
    }
    toProducten() {
      this.route.navigate(['/producten']);
    }
    toRoles() {
      this.route.navigate(['/roles']);
    }
    toSchedules() {
      this.route.navigate(['/schedules']);
    }
    toUsers() {
      this.route.navigate(['/users']);
    }
}
