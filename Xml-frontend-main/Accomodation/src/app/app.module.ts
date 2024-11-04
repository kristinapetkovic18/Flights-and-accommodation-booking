import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReservationModule} from "./modules/components/reservation/reservation.module";
import {AccommodationModule} from "./modules/components/accommodation/accommodation.module";
import { FooterComponent } from './shared/footer/footer.component';
import {ReactiveFormsModule} from "@angular/forms";
import {LogInComponent} from "./modules/pages/log-in/log-in.component";
import {RegisterComponent} from "./modules/pages/register/register.component";
import { ProfileComponent } from './modules/components/profile/profile.component';
import {FormsModule} from "@angular/forms";
import {NavbarModule} from "./shared/navbar/navbar.module";
import { UserInfoComponent } from './modules/components/profile/user-info/user-info.component';

@NgModule({
    declarations: [
        AppComponent,
        ProfileComponent,
        UserInfoComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    PagesModule,
    HospitalModule,
    ReservationModule,
    AccommodationModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarModule
  ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
