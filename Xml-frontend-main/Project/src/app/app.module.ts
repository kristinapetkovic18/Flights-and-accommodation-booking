import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MaterialModule } from "./material/material.module";
import { HospitalModule } from "./modules/hospital/hospital.module";
import { PagesModule } from "./modules/pages/pages.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginpageComponent } from './components/loginpage/loginpage.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FlightsModule } from "./components/flights.module";
import {UserRegisterComponent} from "./components/user-register/user-register.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginpageComponent,
    UserRegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MaterialModule,
        PagesModule,
        HospitalModule,
        ReactiveFormsModule,
        FlightsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
