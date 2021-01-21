import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { UserLogin } from '../../models/user-login.model';
import { environment } from 'src/environments/environment';

@Injectable({
providedIn: 'root'
})

export class AuthenticateService {
  constructor(private _httpClient: HttpClient) { }
  baseUrl = environment.baseUrl
  authenticate(userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>(this.baseUrl + "Users/authenticate", userLogin);
  }

  isLoggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
}
