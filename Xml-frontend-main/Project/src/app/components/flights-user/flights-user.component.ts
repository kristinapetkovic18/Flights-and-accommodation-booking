import { Component, OnInit } from '@angular/core';
import {Flight} from "../../model/flight";
import {MatTableDataSource} from "@angular/material/table";
import {FlightServiceService} from "../../service/flightService/flight-service.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {TicketServiceService} from "../../service/flightService/ticket-service.service";
import {TicketDto} from "../../model/ticketDto";
import {Ticket} from "../../model/ticket";
import {throwDialogContentAlreadyAttachedError} from "@angular/cdk/dialog";

@Component({
  selector: 'app-flights-user',
  templateUrl: './flights-user.component.html',
  styleUrls: ['./flights-user.component.css']
})
export class FlightsUserComponent implements OnInit {

  pageTitle = 'Flights List';
  errorMessage = '';
  public dataSource = new MatTableDataSource<Flight>();
  public displayedColumns = ['destination', 'departure' ,'departureTime', 'duration', 'ticketPrice', 'buy'];
  public flights: Flight[] = [];

  public ticket: Ticket = new Ticket();
  public ticketDto: TicketDto = new TicketDto();

  public userId: string | undefined;



  constructor(private flightService: FlightServiceService, private ticketService: TicketServiceService, private router: Router) { }

  ngOnInit(): void {
    this.flightService.getAvailableFlights().subscribe(res => {
      this.flights = res;
      this.dataSource.data = this.flights;
       this.userId = "user677";
    })
  };

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }

  public tickets() {
    this.router.navigate(['/tickets/' + this.userId]);
  }
  private isValidInput(): boolean {
    if(this.ticketDto?.amount < 1){

      alert('You must enter >0 value for quantity!');
      return false;
    }
    else return true;
  }
  public buyTicket(id: any){
    if (!this.isValidInput()) return;
    this.ticketDto.flightId = id;
    this.ticketDto.userId = "user677";

    this.ticket.flightId =id;
    this.ticket.userId =  "user677";

    if(this.ticketDto.amount == 1){
      this.ticketService.buyOne(this.ticket).subscribe({
        next: res => {
          console.log(res);
          alert('You just bought one ticket with  '+ this.ticket.flightId+ '  id. Go to ticket page to see all your tickets!');
        },
        error: err => {
          console.log(err);
        }
      });
    } else {
      this.ticketService.buyMultiple(this.ticketDto).subscribe({
        next: res => {
          console.log(res);
          alert('You just bought '+ this.ticketDto.amount + ' tickets with  '+ this.ticket.flightId+ '  id. Go to ticket page to see all your tickets!');

        },
        error: err => {
          console.log(err);
        }
        }

      );
    }

  }
}
