import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./modules/pages/home/home.component";
import {LogInComponent} from "./modules/pages/log-in/log-in.component";
import {RegisterComponent} from "./modules/pages/register/register.component";
import {ProfileComponent} from "./modules/components/profile/profile.component";
import {AuthGuardGuard} from "./shared/auth-guard.guard";
import {SearchComponent} from "./modules/components/search/search.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuardGuard]/*, data: {role: ['HOST', 'GUEST']} */},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
