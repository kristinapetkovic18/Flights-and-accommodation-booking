import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Flight} from "../../../../model/flight";
import {Ticket} from "../../../../model/ticket";
import {TicketDto} from "../../../../model/ticketDto";
import {FlightServiceService} from "../../../../service/flightService/flight-service.service";
import {TicketServiceService} from "../../../../service/flightService/ticket-service.service";
import {Router} from "@angular/router";
import {throwError} from "rxjs";
import {SearchRequestDto} from "../../../../model/searchRequestDto";
import {SearchResponseDto} from "../../../../model/searchResponseDto";

@Component({
  selector: 'app-flights-homepage',
  templateUrl: './flights-homepage.component.html',
  styleUrls: ['./flights-homepage.component.css']
})
export class FlightsHomepageComponent implements OnInit {

  pageTitle = 'Flights List';
  public dataSource = new MatTableDataSource<Flight>();
  public displayedColumns = ['id','destination', 'departure' ,'departureTime', 'duration', 'ticketPrice'];
  public flights: Flight[] = [];
  public userId: string | undefined;

  constructor(private flightService: FlightServiceService) { }

  ngOnInit(): void {
    this.flightService.getAvailableFlights().subscribe(res => {
      this.flights = res;
      this.dataSource.data = this.flights;
    })
  };



}
