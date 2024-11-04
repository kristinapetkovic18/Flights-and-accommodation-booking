import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginRequest } from "../dtos/login-request";
import { environment } from "src/environments/environment";
import { LoginResponse } from "../dtos/login-response";
import { Router } from "@angular/router";
import { Token } from "../models/token";
import { Observable, Subject, throwError } from "rxjs";
import { Register } from "../models/register";
import { catchError } from "rxjs/operators";
import { SignInRequestPayload } from "../../../modules/pages/log-in/login-request";
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private user$: Subject<User | null> = new Subject();
  private user: User | null = null;
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  private token$: Subject<string | null> = new Subject();
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.loadAuth();

    // if(this.tokenValid()){
    //   this.clearAuthAndRedirectHome()
    // }
  }

  signIn(signInRequest: SignInRequestPayload): Observable<any> {
    return this.http.post<any>(
      "http://localhost:8080/auth/login",
      signInRequest
    );
  }

  register(register: Register): Observable<any> {
    return this.http
      .post<Register>("http://localhost:8080/users/register", register, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  logout() {
    this.http
      .get<LoginResponse>("http://localhost:8080/users/logout")
      .subscribe({
        next: (response) => {
          this.clearAuthAndRedirectHome();
        },
        error: (error: Error) => {
          this.clearAuthAndRedirectHome();
        },
      });
  }

  loadAuth() {
    this.loadUser();
    this.loadToken();
  }
  //
  // setAuth(token: string) {
  //   this.setUser(token)
  //   this.setToken(token)
  // }

  clearAuth() {
    this.clearUser();
    this.clearToken();
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return true;
    //return this.user != null && this.token != null && this.tokenValid()
  }

  isHost() {
    return this.user != null && this.user.roles.includes("HOST");
  }

  isGuest() {
    return this.user != null && this.user.roles.includes("GUEST");
  }

  getRole() {
    if (this.isHost()) return "HOST";
    else if (this.isGuest()) return "GUEST";
    else return "No role";
  }

  private clearAuthAndRedirectHome() {
    this.clearAuth();
    this.redirectHome();
  }

  private extractUser(token: string) {
    const decodedToken: Token = jwtDecode(token);
    const authorities = decodedToken.authorities.map(
      (auth: any) => auth.authority
    );
    return new User(decodedToken.sub, authorities);
  }

  private tokenValid(): boolean {
    if (!this.token) return true;
    const decodedToken: Token = jwtDecode(this.token);

    const expirationDate = new Date((decodedToken.exp as number) * 1000);
    const currentDate = new Date();

    return currentDate > expirationDate;
  }

  private loadUser() {
    const user = window.sessionStorage.getItem("user");
    if (!user) return;

    this.user = JSON.parse(user);
    this.user$.next(this.user);
  }

  private loadToken() {
    const token = window.sessionStorage.getItem("token");
    if (!token) return;

    this.token = token;
    this.token$.next(this.token);
  }
  /*

  private setUser(token: string) {
    this.user = this.extractUser(token)
    window.sessionStorage.setItem('user', JSON.stringify(this.user))
    this.user$.next(this.user)
  }

  private setToken(token: string) {
    this.token = token
    window.sessionStorage.setItem('token', this.token)
    this.token$.next(this.token)
  } */

  redirectHome() {
    this.router.navigate([""]);
  }

  private clearUser() {
    window.sessionStorage.removeItem("user");
    this.user = null;
    this.user$.next(this.user);
  }

  private clearToken() {
    window.sessionStorage.removeItem("token");
    this.token = null;
    this.token$.next(this.token);
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
