import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Levering } from '../models/levering.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl
  
  getPlanning(id: number): Observable<Levering>{
    return this.http.get<Levering>(this.baseUrl + "leveringen/code/" + id)
  }
}
