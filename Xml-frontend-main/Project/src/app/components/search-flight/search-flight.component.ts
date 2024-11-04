import {Component, Input, OnInit} from '@angular/core';
import {SearchRequestDto} from "../../model/searchRequestDto";
import {SearchResponseDto} from "../../model/searchResponseDto";
import {FlightServiceService} from "../../service/flightService/flight-service.service";
import {MatTableDataSource} from "@angular/material/table";
import {Flight} from "../../model/flight";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {


  public searchRequestDto= new SearchRequestDto();
  public flights: SearchResponseDto[] = [];

  constructor(private flightService: FlightServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  search() {
    if (!this.isValidInput()) return alert('invalid input');

    this.flightService.search(this.searchRequestDto).subscribe({
      next: res => {
        this.flights = res;
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private isValidInput(): boolean {
    return this.searchRequestDto?.airportDeparture != ''
      && this.searchRequestDto?.numPassengers.toString() != ''
      && this.searchRequestDto?.airportDestination!= '';
  }
  refresh() {
    this.searchRequestDto = new SearchRequestDto();
    this.flights = [];
  }

}
