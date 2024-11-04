import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/material/material.module";
import { FlightsViewComponent } from './flights-view/flights-view.component';
import { FlightInfoComponent } from './flight-info/flight-info.component';
import { FlightCreateComponent } from './flight-create/flight-create.component';
import { FlightsUserComponent } from './flights-user/flights-user.component';
import { TicketsViewComponent } from './tickets-view/tickets-view.component';
import {PagesModule} from "../modules/pages/pages.module";
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { SearchResponseComponent } from './search-response/search-response.component';
import {FlightsHomepageComponent} from "../modules/pages/home/flights-homepage/flights-homepage.component";
import {NavbarComponent} from "../modules/pages/user-profile/navbar/navbar.component";
import {FooterComponentComponent} from "./footer-component/footer-component.component";



const routes: Routes = [
  { path: 'flights', component: FlightsViewComponent },
  { path: 'flights/add', component: FlightCreateComponent },
  { path: 'flights/:id', component: FlightInfoComponent },
  { path: 'flights/user/:userId', component: FlightsUserComponent},
  { path: 'tickets/:userId', component: TicketsViewComponent}

];

@NgModule({
  declarations: [
    FlightsViewComponent,
    FlightInfoComponent,
    FlightCreateComponent,
    FlightsUserComponent,
    TicketsViewComponent,
    SearchFlightComponent,
    SearchResponseComponent,
    FlightsHomepageComponent,
    NavbarComponent,
    FooterComponentComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule, FlightsUserComponent, SearchFlightComponent, FlightsHomepageComponent, NavbarComponent]
})
export class FlightsModule { }
