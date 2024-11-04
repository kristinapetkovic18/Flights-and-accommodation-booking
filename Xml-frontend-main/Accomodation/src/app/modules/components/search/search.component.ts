import { Component, OnInit } from '@angular/core';
import { AccommodationService } from 'src/app/core/services/accommodation.service'
import {Accommodation} from "../../../core/models/accommodation";
import {Router} from "@angular/router";
import {ReservationService} from "../../../core/services/reservation.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  guestNum: number = 0;
  location: number = 0;
  startDate: string = '';
  endDate: string = '';
  totalPrice: any;

  searchedAccommodations: Accommodation[] = [];
  accommodationTotalPrices: { [accommodationId: string]: number } = {};

  constructor(private accommodationService: AccommodationService, private router: Router, private reservationService: ReservationService) { }

  searchAccommodations(): void {
    this.accommodationService.search(this.guestNum, this.location, this.startDate, this.endDate)
      .subscribe((accommodations: Accommodation[]) => {
        this.searchedAccommodations = accommodations;
      //  this.calculateTotalPrice();
      });
  }
  chooseAccommodation(id: string) {

    this.router.navigate(['/accommodation/', id]);
  }

  TotalPrice(id: string): number {
    this.reservationService.totalPrice(id,
      this.startDate,
      this.endDate,
      this.guestNum).subscribe(res => {
      this.totalPrice = res
      console.log(res)
    });
    return this.totalPrice;
  }

  Reserve(id: string) {
    this.router.navigate(['reservations/create', id, this.startDate,
      this.endDate,
      this.guestNum]);
  }

}


