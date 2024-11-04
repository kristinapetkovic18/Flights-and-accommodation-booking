import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import { LoginpageComponent} from "./components/loginpage/loginpage.component";
import {UserRegisterComponent} from "./components/user-register/user-register.component";
import {UserProfileComponent} from "./modules/pages/user-profile/user-profile/user-profile.component";
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginpageComponent},
  { path: 'register', component: UserRegisterComponent},
  {path: 'loggedin', component: UserProfileComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
