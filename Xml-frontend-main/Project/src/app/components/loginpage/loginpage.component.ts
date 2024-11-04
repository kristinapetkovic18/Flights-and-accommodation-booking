import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignInRequestPayload } from './login-request';
import { UserServiceService } from 'src/app/service/userService/user-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  signInRequest: SignInRequestPayload;
  loginForm!: FormGroup;
  isExist: boolean = false;

  constructor(
    private userService: UserServiceService, private router: Router) {
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

  onSubmit():void {

  }


  signin(){
    this.signInRequest.email = this.loginForm.get('email')?.value;
    this.signInRequest.password = this.loginForm.get('password')?.value;
    console.log(this.signInRequest)
    this.userService.signIn(this.signInRequest).subscribe(data => {
      this.isExist = false;
      const user = JSON.parse(data);
      localStorage.setItem("token", user.token);
    }, error => {
      if(error['status'] == 403){
        this.isExist = true;
      }
    });
  }
}
