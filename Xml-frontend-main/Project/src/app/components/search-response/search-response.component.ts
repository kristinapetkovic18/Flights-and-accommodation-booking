import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SearchResponseDto} from "../../model/searchResponseDto";
import {ActivatedRoute, Params} from "@angular/router";
import {FlightServiceService} from "../../service/flightService/flight-service.service";
import {Flight} from "../../model/flight";

@Component({
  selector: 'app-search-response',
  templateUrl: './search-response.component.html',
  styleUrls: ['./search-response.component.css']
})
export class SearchResponseComponent implements OnInit {
  @Input() flights : any;
  public dataSource = new MatTableDataSource<SearchResponseDto>();
  public displayedColumns = ['ticketPrice', 'destination', 'departure' ,'departureTime', 'duration', 'totalPrice'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource= this.flights;
  }

}
