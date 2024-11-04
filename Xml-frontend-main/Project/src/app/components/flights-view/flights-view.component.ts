import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Flight } from "../../model/flight";
import { FlightServiceService } from '../../service/flightService/flight-service.service';
import {FlightsModule} from "../flights.module";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FlightInfoComponent} from "../flight-info/flight-info.component";

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css']
})
export class FlightsViewComponent implements OnInit {

  pageTitle = 'Flights List';
  errorMessage = '';
  public dataSource = new MatTableDataSource<Flight>();
  public displayedColumns = ['id', 'destination', 'departure' ,'departureTime', 'duration', 'ticketPrice', 'delete'];
  public flights: Flight[] = [];

  constructor(private flightService: FlightServiceService, private router: Router) { }

  ngOnInit(): void {
    this.flightService.getFlights().subscribe(res => {
      this.flights = res;
      this.dataSource.data = this.flights;
    })
  }

  public chooseFlight(id: string) {
    this.router.navigate(['/flights/', id]);
  }

  public deleteFlight(id: number) {
    this.flightService.deleteFlight(id).subscribe(res => {
      this.flightService.getFlights().subscribe(res => {
        this.flights = res;
        this.dataSource.data = this.flights;
      })
    })
  }

  public addFlight() {
    this.router.navigate(['/flights/add']);
  }


}
