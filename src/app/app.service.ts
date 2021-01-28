import { Injectable } from '@angular/core';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  loggedUser: User = null;

  setLoggedUser(user: User) {
    this.loggedUser = user;
    localStorage.setItem("LoggedUser", JSON.stringify(user));
  }

  getLoggedUser() {
    this.loggedUser = JSON.parse(localStorage.getItem("LoggedUser"));
    return this.loggedUser;
  }
}
