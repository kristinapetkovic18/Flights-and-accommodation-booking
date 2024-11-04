import { Component } from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HospitalFront';
/*
  private userSub: Subscription;
  isLogged = false

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.autoLogin()
    this.userSub = this.authService.user.subscribe(user =>{
      this.isLogged = !!user
    });
  } */
}
