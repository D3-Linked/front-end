import { Component, OnInit } from '@angular/core';

import { AuthenticateService } from '../services/authenticate.service';
import { UserLogin } from '../../models/user-login.model';

import { Router } from '@angular/router';

import { AppService } from '../../app.service';
import { AppComponent } from 'src/app/app.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  constructor(private _authenticateService: AuthenticateService, private router: Router, private appService: AppService, private AppComponent: AppComponent, private _snackBar: MatSnackBar) { }

  submitted: boolean = false;
  userLogin: UserLogin = new UserLogin('', '');

  //Kijk na of de user misschien al ingelogd was
  ngOnInit(): void {
    if (this._authenticateService.isLoggedIn()) {
      this.router.navigateByUrl('/');
      console.log("already logged in");
    }
  }

  //Methode om de snackbar te openen
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  //Na submit van het loginform, voer authenticatie uit
  onSubmit() {
    this.submitted = true;
    this._authenticateService.authenticate(this.userLogin).subscribe(result => {
      this.appService.setLoggedUser(result);
      this.AppComponent.getLoggedUser();
      localStorage.setItem("token", result.token);
      this.router.navigate(['/']);
    }, error => {
      this.openSnackBar("Verkeerde email of paswoord", "OK");
    });

  }
}
