import { Component, OnInit } from '@angular/core';
import {Flight} from "../../model/flight";
import {FlightServiceService} from "../../service/flightService/flight-service.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit {

  public flight: Flight = new Flight();
  constructor(private  flightServiceService: FlightServiceService, private router: Router) { }

  public createFlight(){
    if (!this.isValidInput()) return alert('invalid input');

    this.flightServiceService.createFlight(this.flight).subscribe(res => {
      this.router.navigate(['/flights']);
    });
  }
  private isValidInput(): boolean {
    return this.flight?.airportDeparture != ''
      && this.flight?.duration.toString() != ''
      && this.flight?.ticketPrice.toString() != ''
      && this.flight?.capacity.toString() != ''
      && this.flight?.airportDestination!= '';
  }
  ngOnInit(): void {
  }

}
