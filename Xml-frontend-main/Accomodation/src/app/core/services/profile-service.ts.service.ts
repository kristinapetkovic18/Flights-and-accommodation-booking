import { Injectable } from '@angular/core';
import {SignInRequestPayload} from "../../modules/pages/log-in/login-request";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserProfileDto} from "../dtos/userDto";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceTsService {

  baseUrl = 'http://localhost:8080/users'
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  get(id: number): Observable<any> {
    return this.http.get(this.baseUrl + '/getUserByID/' + id, {headers: this.headers});
  }

  getCurrentUser(): Observable<User> {
    let headers = new HttpHeaders({
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("token"),
    });
    let options = {headers:headers};
    console.log(localStorage.getItem("token"))
    return this.http.get<User>(this.baseUrl +'/current', options);
  }

  updateUserProfile(user: User): Observable<any>{
    let headers = new HttpHeaders({
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("token"), //autorizacija
    });
    let options = {headers:headers};
    return this.http.put(this.baseUrl +'/updateProfile', user, options);
  }

}
