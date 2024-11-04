import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Room} from "../../modules/hospital/model/room.model";
import {Accommodation} from "../models/accommodation";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {


  apiHost: string = 'http://localhost:8080/accommodations';
  headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.apiHost + '/all', {headers: this.headers});
  }
//accommodation{id}
  get(id: number): Observable<Accommodation> {
    return this.http.get<Accommodation>(this.apiHost + '/accommodation' + id, {headers: this.headers});
  }
/*
  delete(id: any): Observable<any> {
    return this.http.delete<any>(this.apiHost + '/rooms/' + id, {headers: this.headers});
  }*/

  create(accommodationDto: any): Observable<any> {
    console.log(accommodationDto);
    return this.http.post<any>('http://localhost:8080/accommodations/createAccomodation', accommodationDto, {headers: this.headers});
  }

  search(guestsNum: number, location: number, startDate: string, endDate: string): Observable<Accommodation[]> {
    const url = `${this.apiHost}/search/${guestsNum}/${location}/${startDate}/${endDate}`;
    return this.http.get<Accommodation[]>(url, { headers: this.headers });
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

  getByHostId(id: number): Observable<Accommodation[]> {
  return this.http.get<Accommodation[]>(this.apiHost +'/host' + id, {headers: this.headers});
}
}
