import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';
import { Laadkade } from '../models/laadkade.model';
import { Leverancier } from '../models/leverancier.model';
import { Levering } from '../models/levering.model';
import { Product } from '../models/product.model';

import { Schedule } from '../models/schedule.model';

@Injectable({
  providedIn: 'root'
})
export class PlanningAdminService {
  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;

  //SCHEDULES
  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.baseUrl + "schedules");
  }

  getScheduleById(id:number): Observable<Schedule>{
    return this.http.get<Schedule>(this.baseUrl + "schedules/" + id);
  }

  getSchedulesByDateRange(start: string, end: string): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.baseUrl + "schedules/start/" + start + "/end/" + end);
  }

  addSchedule(newSchedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.baseUrl + "schedules/", newSchedule);
  }

  //LEVERINGEN
  getLeveringenByScheduleId(id:number): Observable<Levering[]>{
    return this.http.get<Levering[]>(this.baseUrl + "leveringen/schedule/" + id);
  }

  addLevering(newLevering: Levering): Observable<Levering> {
    return this.http.post<Levering>(this.baseUrl + "leveringen/", newLevering);
  }

  //PRODUCTEN
  getProductenByLeveringId(id:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + "producten/levering/" + id);
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + "producten/", newProduct);
  }

  //LEVERANCIERS
  getLeveranciers(): Observable<Leverancier[]> {
    return this.http.get<Leverancier[]>(this.baseUrl + "leveranciers");
  }

  //LAADKADES
  getLaadkades(): Observable<Laadkade[]> {
    return this.http.get<Laadkade[]>(this.baseUrl + "laadkades");
  }
}
