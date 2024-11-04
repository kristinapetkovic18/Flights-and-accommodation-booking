import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Flight} from "../../model/flight";
import {Ticket} from "../../model/ticket";
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {TicketCreate} from "../../model/ticketCreate";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";
@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {


  ticketCreate: TicketCreate= new TicketCreate();
  apiHost: string = 'http://localhost:5001/api/ticket';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }


  getTickets(id: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.apiHost + '/user/' + id, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );
  }

  buyOne(ticket: any): Observable<any> {

    console.log(ticket);
    return this.http.post<any>('http://localhost:5001/api/ticket/buy/'+
      ticket.flightId, ticket,
      {headers: this.headers});
  }

  buyMultiple(ticketDto: any): Observable<any> {
    console.log(ticketDto);
    return this.http.post<any>( 'http://localhost:5001/api/ticket/buymultiple/'+ ticketDto.flightId, ticketDto, {headers: this.headers}).pipe(
      catchError(this.handleError)
    );

  }

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
}
