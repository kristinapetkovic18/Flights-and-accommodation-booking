import {Component, Host, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../../core/auth/services/auth.service";
import {User} from "../../../../core/auth/models/user";
import {Register} from "../../../../core/auth/models/register";
import {ProfileServiceTsService} from "../../../../core/services/profile-service.ts.service";
import {TokenService} from "../../../../core/services/token.service";

//import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private userType: number = -1;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router, private profileService: ProfileServiceTsService) {

  }
  token = localStorage.getItem("token")

  ngOnInit(): void {
this.id = Number(this.tokenService.getIdFromToken());this.profileService.get(this.id).subscribe({
        next: res => {
          this.userType = res.userType;
        },
        error: err => {
          console.log(err);
        }
      }
    ) ;

  }

//  private userSub: Subscription;
  isLogged: boolean = false
  isToggled: boolean= false
  name: string = ''
  User : any;
  id: number = 0;

  isLoggedHost():boolean{
    if (this.userType  == 0)return true;
    else return false;
  }


  isLoggedGuest():boolean{
    if (this.userType  == 1)return true;
    else return false;
  }
  ngOnDestroy(): void {
    //  this.userSub.unsubscribe();
  }

  onHome(){
    this.router.navigate(['/'])
  }

  profile(){
    this.router.navigate(['/profile'])
  }
  onLogout(){
    localStorage.clear();
  }

  onToggle(){
    this.isToggled = !this.isToggled;
  }

  ReservationsHost() {
    this.router.navigate(['/reservations/host/'+this.id])

  }

  ReservationsGuest() {
    this.router.navigate(['/reservations/guest/'+this.id])
  }

  Accommodations() {
    this.router.navigate(['/accommodations'])
  }

  AccommodationsHost() {

    this.router.navigate(['/accommodations/host/'+this.id])
  }

  Add() {
    this.router.navigate(['/accommodations/create/'+this.id])

  }
  //profile
  Profile() {
    this.router.navigate(['/profile'])

  }
}

