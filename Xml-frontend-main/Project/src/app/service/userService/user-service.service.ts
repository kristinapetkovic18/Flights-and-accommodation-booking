import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { SignInRequestPayload } from 'src/app/components/loginpage/login-request';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl = 'http://localhost:5001'

  constructor(private httpClient: HttpClient) { }

  getOneUser(email: string | null): Observable<User> {


    return this.httpClient.get<User>(this.baseUrl + '/api/users' + email );
  }

  Registration(user : User) : Observable<any> {
    return this.httpClient.post<User>('https://localhost:5001/api/user/register',user);
  }

  findAll(): Observable<User[]>{
    let headers = new HttpHeaders({
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("token"),
    });
    let options = {headers:headers};
    return this.httpClient.get<User[]>(this.baseUrl +'/api/users', options);
  }

  singUp(user: User): Observable<any> {
    return this.httpClient.post(this.baseUrl +'/api/users/', user, { responseType: 'text' });
  }

  signIn(signInRequest: SignInRequestPayload): Observable<any> {
    return this.httpClient.post(this.baseUrl +'/api/users/login', signInRequest, { responseType: 'text' });
  }

  changeUser(user: User): Observable<any>{
    let headers = new HttpHeaders({
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("token"), //autorizacija
    });
    let options = {headers:headers};
    return this.httpClient.put(this.baseUrl +'/api/users/update-user/' + user.id, user, options);
  }

  changePassword(data: any): Observable<any>{
    let headers = new HttpHeaders({
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("token"),
    });
    let options = {headers:headers};
    return this.httpClient.put(this.baseUrl +'/api/users/passwordChange', data, options);
  }

  returnUser(): Observable<User> {
    let headers = new HttpHeaders({
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("token"),
    });
    let options = {headers:headers};
    return this.httpClient.get<User>(this.baseUrl +'/api/users/1', options);
  }

  getCurrentUser(): Observable<User> {
    let headers = new HttpHeaders({
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + localStorage.getItem("token"),
    });
    let options = {headers:headers};
    console.log(localStorage.getItem("token"))
    return this.httpClient.get<User>(this.baseUrl +'/api/users/current', options);
  }

}
