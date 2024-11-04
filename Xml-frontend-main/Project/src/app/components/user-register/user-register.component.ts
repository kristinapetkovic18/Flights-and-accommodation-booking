import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {UserServiceService} from "../../service/userService/user-service.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {HttpClient, HttpErrorResponse, HttpRequest, HttpResponse, HttpStatusCode} from "@angular/common/http";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  user: User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    password: '',
    address: '',
    city: '',
    country: '',
    mobile: '',
  };

  constructor(
    private userService: UserServiceService,
    private router: Router
  ) { }

  registrationForm!: FormGroup
  successfully: boolean = false;

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      //userType: new FormControl('', Validators.required)
    })
  }
  registration() {
    console.log(this.user)
    this.user.name = this.registrationForm.get("name")?.value;  //preuzimanje param forme
    this.user.surname = this.registrationForm.get("surname")?.value;
    this.user.email = this.registrationForm.get("email")?.value;
    this.user.password = this.registrationForm.get("password")?.value;
    this.user.address = this.registrationForm.get("address")?.value;
    this.user.city = this.registrationForm.get("city")?.value;
    this.user.country = this.registrationForm.get("country")?.value;
    this.user.mobile = this.registrationForm.get("mobile")?.value;
    //this.user.userType = this.registrationForm.get("userType")?.value;

    console.log(this.registrationForm.get("name")?.value)

    this.userService.Registration(this.user).subscribe(result => {
      alert("Done")
      this.router.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }
}
