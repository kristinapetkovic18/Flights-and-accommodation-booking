import { MaterialModule } from '../material/material.module';
import {FooterComponent} from "./footer.component";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";



@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
