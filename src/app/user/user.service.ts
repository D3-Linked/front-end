import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Levering } from '../models/levering.model';
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl

  getPlanning(id: number, nummerplaat:string): Observable<Levering[]>{
    return this.http.get<Levering[]>(this.baseUrl + "leveringen/code/" + id + "/nummerplaat/" + nummerplaat)
  }

  getProductenByLeveringId(id:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + "producten/levering/" + id);
  }
}
