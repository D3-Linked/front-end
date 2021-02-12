import { Component } from '@angular/core';
import { User } from './models/user.model';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'application-frontend';
  currentDate = new Date().getFullYear();
  loggedUser: User = null;

  constructor(private router: Router, private appService: AppService){
    this.getLoggedUser();
  }

  //Haal de gegevens van de ingelogde user op
  getLoggedUser(){
    this.loggedUser = this.appService.getLoggedUser();
  }

  //log de user uit
  onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedUser");
    this.loggedUser = null;
    this.router.navigate(['/login']);
  }
}
