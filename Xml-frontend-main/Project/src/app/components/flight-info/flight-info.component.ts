import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { Flight } from "../../model/flight";
import { FlightServiceService } from '../../service/flightService/flight-service.service';
@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css']
})
export class FlightInfoComponent implements OnInit {

  public flight: Flight | undefined;

  constructor(private flightService: FlightServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.flightService.getFlight(params['id']).subscribe(res => {
        this.flight = res;
      })
    });
  }
}
