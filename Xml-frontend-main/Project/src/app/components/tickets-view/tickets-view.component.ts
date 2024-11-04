import { Component, OnInit } from '@angular/core';
import {Flight} from "../../model/flight";
import {MatTableDataSource} from "@angular/material/table";
import {FlightServiceService} from "../../service/flightService/flight-service.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Ticket} from "../../model/ticket";
import {TicketServiceService} from "../../service/flightService/ticket-service.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-tickets-view',
  templateUrl: './tickets-view.component.html',
  styleUrls: ['./tickets-view.component.css']
})
export class TicketsViewComponent implements OnInit {


  pageTitle = 'Tickets List';
  errorMessage = '';
  public displayedColumns = ['id', 'flightId'];

  public userId: string = "user677";
  public dataSource  = new MatTableDataSource<Ticket>();
  public tickets: Ticket[] = [];
  public flight: Flight = new Flight();

  constructor(private ticketService: TicketServiceService,private flightService: FlightServiceService, private route: Router) { }

  ngOnInit(): void {
     this.ticketService.getTickets(this.userId).subscribe(res => {
      this.tickets = res;
      this.dataSource.data = this.tickets;
    })
  }

  public chooseFlight(id: string) {
    this.route.navigate(['/flights/', id]);
  }
}
