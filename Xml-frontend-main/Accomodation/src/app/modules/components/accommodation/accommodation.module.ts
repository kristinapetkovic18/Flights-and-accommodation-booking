import {CommonModule, NgOptimizedImage} from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { MaterialModule } from "src/app/material/material.module";
import {NavbarComponent} from "../../../shared/navbar/components/navbar/navbar.component";
import {NavbarModule} from "../../../shared/navbar/navbar.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AccommodationComponent} from "./accommodation-homepage/accommodation-all.component";
import {AccommodationCreateComponent} from "./accommodation-create/accommodation-create.component";
import {AccommodationViewComponent} from "./accommodation-view/accommodation-view.component";
import { AccommodationViewAllComponent } from './accommodation-view-all/accommodation-view-all.component';
import { AccommodationHostComponent } from './accommodation-host/accommodation-host.component';
import {SearchComponent} from "../search/search.component";
import {FooterModule} from "../../../shared/footer/footer.module";


const routes: Routes = [
  { path: 'accommodations', component: AccommodationViewAllComponent },
  { path: 'accommodations/create/:id', component: AccommodationCreateComponent },
  {path : 'accommodation/:id', component: AccommodationViewComponent},
  {path : 'accommodations/host/:id', component:AccommodationHostComponent}
];

@NgModule({
  declarations: [
    AccommodationCreateComponent,
    AccommodationViewComponent,
    AccommodationComponent,
    AccommodationViewAllComponent,
    AccommodationHostComponent,
    SearchComponent
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
      NgOptimizedImage
    ],
  exports: [RouterModule, AccommodationComponent]
})
export class AccommodationModule { }
