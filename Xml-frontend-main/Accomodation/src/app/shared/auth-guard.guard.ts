import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../core/auth/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router,
              private  auth: AuthService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.checkUserAuthentication(route);
  }

  checkUserAuthentication(route: ActivatedRouteSnapshot):boolean{
    if(this.auth.isAuthenticated()){
      const userRole = this.auth.getRole();
      if(route.data['role'] && route.data['role'].indexOf(userRole)===-1){
        this.router.navigate(["/login"]);
        return false;
      }
      return true;
    }
    this.router.navigate(["/login"]);
    return false;
  }

}
