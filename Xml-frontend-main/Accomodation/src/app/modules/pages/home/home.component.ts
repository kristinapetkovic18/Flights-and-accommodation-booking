import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccommodationService} from "../../../core/services/accommodation.service";
import {MatDialog} from "@angular/material/dialog";
import {LogInComponent} from "../log-in/log-in.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

accommodations: any = [];
public dialog!: MatDialog;
constructor(private router: Router, private accommodationService: AccommodationService) { }

ngOnInit(): void {

  this.accommodationService.getAll().subscribe((data) => {
    this.accommodations = data;
  });
}

onClick(path: string) {
  this.router.navigate([`/${path}`]);
}
}
