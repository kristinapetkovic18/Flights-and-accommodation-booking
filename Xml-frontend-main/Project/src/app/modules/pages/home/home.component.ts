import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlightServiceService} from "../../../service/flightService/flight-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  flights: any = [];
  constructor(private router: Router, private flightService: FlightServiceService) { }

  ngOnInit(): void {

    this.flightService.getAvailableFlights().subscribe((data) => {
      this.flights = data;
    });
  }

  onClick(path: string) {
    this.router.navigate([`/${path}`]);
  }
}
