import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  loggedUser: User = null;

  //Zet de gegevens van de ingelogde user in localstorage
  setLoggedUser(user: User) {
    this.loggedUser = user;
    localStorage.setItem("LoggedUser", JSON.stringify(user));
  }

  //Haal de gegevens van de ingelogde user op uit localstorage
  getLoggedUser() {
    this.loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    return this.loggedUser;
  }
}
