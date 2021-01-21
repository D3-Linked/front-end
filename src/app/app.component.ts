import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'application-frontend';

  loggedUser: User = null;

  constructor(private router: Router){
    this.loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
  }

  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedUser");
    this.router.navigate(['/login']);
  }
}
