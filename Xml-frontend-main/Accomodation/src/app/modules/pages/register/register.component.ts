import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/services/auth.service";
import {Register, UserType} from "../../../core/auth/models/register";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new Register('', '','','',0, 1)

  constructor(private authService: AuthService, private router: Router) {}

  registerAsGuest() {
    this.registerForm.userType = 1;
    this.authService.register(this.registerForm).subscribe({
      next: res => {
        console.log(res);
        alert("successfully registered as GUEST with id:" +res.id);
      },
      error: err => {
        console.log(err);
      }
    });

  }
  ngOnInit(): void {
  }

  registerAsHost() {
    this.registerForm.userType = 0;
    this.authService.register(this.registerForm).subscribe({
      next: res => {
        console.log(res);
        alert("successfully registered as HOST with id:" +res.id);
      },
      error: err => {
        console.log(err);
      }
    });

  }
  login() {
    this.router.navigate(['/login']);
  }
}
