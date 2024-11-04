import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './home/footer/footer.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { OurServicesComponent } from './home/our-services/our-services.component';
import {MatIconModule} from "@angular/material/icon";
import {FlightsModule} from "../../components/flights.module";
import { FlightsHomepageComponent } from './home/flights-homepage/flights-homepage.component';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import { UserProfileComponent } from './user-profile/user-profile/user-profile.component';
import { NavbarComponent } from './user-profile/navbar/navbar.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    FooterComponent,
    CarouselComponent,
    OurServicesComponent,
    UserProfileComponent
  ],
  exports: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    FormsModule,
    FlightsModule
  ]
})
export class PagesModule { }
