import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { OurServicesComponent } from './home/our-services/our-services.component';
import {FooterModule} from "../../shared/footer/footer.module";
import {AccommodationModule} from "../components/accommodation/accommodation.module";
import {InputModule} from "../../shared/ui/input/input.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    CarouselComponent,
    OurServicesComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        FooterModule,
        AccommodationModule,
        InputModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class PagesModule { }
