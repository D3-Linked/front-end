import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Bedrijf } from '../models/bedrijf.model';
import { Laadkade } from '../models/laadkade.model';
import { Leverancier } from '../models/leverancier.model';
import { Levering } from '../models/levering.model';
import { Product } from '../models/product.model';
import { Role } from '../models/role.model';
import { Schedule } from '../models/schedule.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl

  //BEDRIJVEN
  getBedrijven(): Observable<Bedrijf[]> {
    return this.http.get<Bedrijf[]>(this.baseUrl + "/bedrijven");
  }

  addBedrijf(newBedrijf: Bedrijf): Observable<Bedrijf> {
    return this.http.post<Bedrijf>(this.baseUrl + "/bedrijven", newBedrijf);
  }

  deleteBedrijf(bedrijfID: number): Observable<Bedrijf> {
    return this.http.delete<Bedrijf>(this.baseUrl + "/bedrijven" + bedrijfID);
  }

  getBedrijfById(id:number): Observable<Bedrijf>{
    return this.http.get<Bedrijf>(this.baseUrl + "/bedrijven" + id);
  }

  updateBedrijf(bedrijfID: number, bedrijf: Bedrijf): Observable<Bedrijf> {
    return this.http.put<Bedrijf>(this.baseUrl + "/bedrijven" + bedrijfID, bedrijf);
  }

  //LAADKADES
  getLaadkades(): Observable<Laadkade[]> {
    return this.http.get<Laadkade[]>(this.baseUrl + "/laadkades");
  }
  //LEVERANCIERS
  getLeveranciers(): Observable<Leverancier[]> {
    return this.http.get<Leverancier[]>(this.baseUrl + "/leveranciers");
  }
  //LEVERINGEN
  getLeveringen(): Observable<Levering[]> {
    return this.http.get<Levering[]>(this.baseUrl + "/leveringen");
  }
  //PRODUCTEN
  getProducten(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "/producten");
  }
  //ROLES
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + "/roles");
  }
  //SCHEDULES
  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.baseUrl + "/schedules");
  }
  //USERS
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "/users");
  }
}
