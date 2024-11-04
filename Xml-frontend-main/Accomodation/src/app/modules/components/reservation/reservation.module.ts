import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/material/material.module";
import {ReservationTableComponent} from "./reservation-table/reservation-table.component";
import {ReservationCreateComponent} from "./reservation-create/reservation-create.component";
import {NavbarComponent} from "../../../shared/navbar/components/navbar/navbar.component";
import {NavbarModule} from "../../../shared/navbar/navbar.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { ReservationHostComponent } from './reservation-host/reservation-host.component';
import {FooterModule} from "../../../shared/footer/footer.module";
import { ReservationSearchComponent } from './reservation-search/reservation-search.component';
import {InputModule} from "../../../shared/ui/input/input.module";
import {UserInfoComponent} from "../profile/user-info/user-info.component";


const routes: Routes = [
  { path: 'reservations/guest/:id', component: ReservationTableComponent },
  { path: 'reservations/create/:id', component: ReservationCreateComponent },
  {path : 'reservations/host/:id', component: ReservationHostComponent},
  {path : 'reservations/create/:id/:start/:end/:number', component: ReservationSearchComponent},
  {path : 'info/:id', component: UserInfoComponent}


];

@NgModule({
  declarations: [
    ReservationTableComponent,
    ReservationCreateComponent,
    ReservationHostComponent,
    ReservationSearchComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NavbarModule,
        MatDatepickerModule,
        FooterModule,
        InputModule
    ],
  exports: [RouterModule, ReservationTableComponent, ReservationCreateComponent]
})
export class ReservationModule { }
