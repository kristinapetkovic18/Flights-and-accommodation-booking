import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import {RouterLinkActive} from "@angular/router";
import {NavbarComponent} from "./components/navbar/navbar.component";



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterLinkActive
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
