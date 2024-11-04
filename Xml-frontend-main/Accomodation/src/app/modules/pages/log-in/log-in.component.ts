import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../core/auth/services/auth.service";
import {LoginRequest} from "../../../core/auth/dtos/login-request";
import {Router} from "@angular/router";
import {SignInRequestPayload} from "./login-request";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit{


  signInRequest: SignInRequestPayload;
  loginForm!: FormGroup;
  isExist: boolean = false;




  constructor(private authService: AuthService, private router: Router) {
    this.signInRequest = {
      email:'',
      password: ''
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.minLength(2)),
      password: new FormControl()
    })
  }

  signin() {
    this.signInRequest.email = this.loginForm.get('email')?.value;
    this.signInRequest.password = this.loginForm.get('password')?.value;
    this.authService.signIn(this.signInRequest).subscribe({next: data => {
      this.isExist = false;
      console.log(data.text);
      localStorage.setItem("token", data.text);
      this.router.navigate(['/profile'])
      }, error:error => {
      console.log(error)
      if (error['status'] == 403) {
        this.isExist = true;
      }
    }});

  }
  register() {
    this.router.navigate(['/register']);
  }

}
