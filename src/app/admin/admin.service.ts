import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

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
export class AdminService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl

  //BEDRIJVEN
  getBedrijven(): Observable<Bedrijf[]> {
    return this.http.get<Bedrijf[]>(this.baseUrl + "bedrijven/");
  }

  addBedrijf(newBedrijf: Bedrijf): Observable<Bedrijf> {
    return this.http.post<Bedrijf>(this.baseUrl + "bedrijven/", newBedrijf);
  }

  deleteBedrijf(bedrijfID: number): Observable<Bedrijf> {
    return this.http.delete<Bedrijf>(this.baseUrl + "bedrijven/" + bedrijfID);
  }

  getBedrijfById(id:number): Observable<Bedrijf>{
    return this.http.get<Bedrijf>(this.baseUrl + "bedrijven/" + id);
  }

  updateBedrijf(bedrijfID: number, bedrijf: Bedrijf): Observable<Bedrijf> {
    return this.http.put<Bedrijf>(this.baseUrl + "bedrijven/" + bedrijfID, bedrijf);
  }

  //LAADKADES
  getLaadkades(): Observable<Laadkade[]> {
    return this.http.get<Laadkade[]>(this.baseUrl + "laadkades");
  }

  addLaadkade(newLaadkade: Laadkade): Observable<Laadkade> {
    return this.http.post<Laadkade>(this.baseUrl + "laadkades/", newLaadkade);
  }

  deleteLaadkade(laadkadeID: number): Observable<Laadkade> {
    return this.http.delete<Laadkade>(this.baseUrl + "laadkades/" + laadkadeID);
  }

  getLaadkadeById(id:number): Observable<Laadkade>{
    return this.http.get<Laadkade>(this.baseUrl + "laadkades/" + id);
  }

  updateLaadkade(laadkadeID: number, laadkade: Laadkade): Observable<Laadkade> {
    return this.http.put<Laadkade>(this.baseUrl + "laadkades/" + laadkadeID, laadkade);
  }

  //LEVERANCIERS
  getLeveranciers(): Observable<Leverancier[]> {
    return this.http.get<Leverancier[]>(this.baseUrl + "leveranciers");
  }

  addLeverancier(newLeverancier: Leverancier): Observable<Leverancier> {
    return this.http.post<Leverancier>(this.baseUrl + "leveranciers/", newLeverancier);
  }

  deleteLeverancier(leverancierID: number): Observable<Leverancier> {
    return this.http.delete<Leverancier>(this.baseUrl + "leveranciers/" + leverancierID);
  }

  getLeverancierById(id:number): Observable<Leverancier>{
    return this.http.get<Leverancier>(this.baseUrl + "leveranciers/" + id);
  }

  updateLeverancier(leverancierID: number, leverancier: Leverancier): Observable<Leverancier> {
    return this.http.put<Leverancier>(this.baseUrl + "leveranciers/" + leverancierID, leverancier);
  }

  //LEVERINGEN
  getLeveringen(): Observable<Levering[]> {
    return this.http.get<Levering[]>(this.baseUrl + "leveringen");
  }

  addLevering(newLevering: Levering): Observable<Levering> {
    return this.http.post<Levering>(this.baseUrl + "leveringen/", newLevering);
  }

  deleteLevering(leveringID: number): Observable<Levering> {
    return this.http.delete<Levering>(this.baseUrl + "leveringen/" + leveringID);
  }

  getLeveringById(id:number): Observable<Levering>{
    return this.http.get<Levering>(this.baseUrl + "leveringen/" + id);
  }

  getLeveringenByScheduleId(id:number): Observable<Levering[]>{
    return this.http.get<Levering[]>(this.baseUrl + "leveringen/schedule/" + id);
  }

  getLeveringenByDateRange(start: string, end: string): Observable<Levering[]>{
    return this.http.get<Levering[]>(this.baseUrl + "leveringen/start/" + start + "/end/" + end);
  }

  updateLevering(leveringID: number, levering: Levering): Observable<Levering> {
    return this.http.put<Levering>(this.baseUrl + "leveringen/" + leveringID, levering);
  }

  //PRODUCTEN
  getProducten(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "producten");
  }

  addProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl + "producten/", newProduct);
  }

  deleteProduct(productID: number): Observable<Product> {
    return this.http.delete<Product>(this.baseUrl + "producten/" + productID);
  }

  getProductById(id:number): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + "producten/" + id);
  }

  getProductenByLeveringId(id:number): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl + "producten/levering/" + id);
  }

  updateProduct(productID: number, product: Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + "producten/" + productID, product);
  }

  //ROLES
  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.baseUrl + "roles");
  }

  addRole(newRole: Role): Observable<Role> {
    return this.http.post<Role>(this.baseUrl + "roles/", newRole);
  }

  deleteRole(roleID: number): Observable<Role> {
    return this.http.delete<Role>(this.baseUrl + "roles/" + roleID);
  }

  getRoleById(id:number): Observable<Role>{
    return this.http.get<Role>(this.baseUrl + "roles/" + id);
  }

  updateRole(roleID: number, role: Role): Observable<Role> {
    return this.http.put<Role>(this.baseUrl + "roles/" + roleID, role);
  }

  //SCHEDULES
  getSchedules(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.baseUrl + "schedules");
  }

  addSchedule(newSchedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.baseUrl + "schedules/", newSchedule);
  }

  deleteSchedule(scheduleID: number): Observable<Schedule> {
    return this.http.delete<Schedule>(this.baseUrl + "schedules/" + scheduleID);
  }

  getScheduleById(id:number): Observable<Schedule>{
    return this.http.get<Schedule>(this.baseUrl + "schedules/" + id);
  }

  updateSchedule(scheduleID: number, schedule: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(this.baseUrl + "schedules/" + scheduleID, schedule);
  }

  getSchedulesByDateRange(start: string, end: string): Observable<Schedule[]>{
    return this.http.get<Schedule[]>(this.baseUrl + "schedules/start/" + start + "/end/" + end);
  }

  //USERS
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "users");
  }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + "users/", newUser);
  }

  deleteUser(userID: number): Observable<User> {
    return this.http.delete<User>(this.baseUrl + "users/" + userID);
  }

  getUserById(id:number): Observable<User>{
    return this.http.get<User>(this.baseUrl + "users/" + id);
  }

  updateUser(userID: number, user: User): Observable<User> {
    return this.http.put<User>(this.baseUrl + "users/" + userID, user);
  }
}
