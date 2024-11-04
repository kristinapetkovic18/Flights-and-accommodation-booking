import { Component, OnInit } from '@angular/core';
import {ReservationDto} from "../../../../core/dtos/reservationDto";
import {AccommodationService} from "../../../../core/services/accommodation.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ReservationService} from "../../../../core/services/reservation.service";
import {TokenService} from "../../../../core/services/token.service";

@Component({
  selector: 'app-reservation-search',
  templateUrl: './reservation-search.component.html',
  styleUrls: ['./reservation-search.component.css']
})
export class ReservationSearchComponent implements OnInit {

  public reservedDates: Date[] = [];
  public reservedDateSliced: Date[] = [];
  public totalPrice: any;
  public reservation: ReservationDto = new ReservationDto();
  constructor(private accommodationService: AccommodationService,
              private tokenService: TokenService,
              private route: ActivatedRoute,
              private  reservationService: ReservationService,
              private router: Router) {

    this.reservation.guestId =this.tokenService.getIdFromToken();
    this.reservation.accepted = false;
    this.reservation.totalPrice = 100;}



  public createReservation(){
    if (!this.isValidInput()) return alert('invalid input');
    this.reservationService.createReservation(this.reservation).subscribe(res => {
      alert("created pending reservation with id "+res.id+ " from date: " +res.startDate +" to : "  +res.endDate)
    });
  }

  dateFilters: (date: Date | null) => boolean = (date: Date | null) => {
    if (!date) return false; // early exit if date is null
    let excludedDates: Date[] = this.reservedDateSliced;
    const dateString = date.toDateString();
    return !excludedDates.some(excludedDate => excludedDate.toDateString() === dateString);
  }
  private isValidInput(): boolean {
    return this.reservation?.numGuests.toString() != ''
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.reservation.accommodationId = (params['id']);
      this.reservation.startDate = (params['start']);
        this.reservation.endDate=(params['end']);
          this.reservation.numGuests=(params['number']);
      this.reservationService.notAvailableDates(params['id']).subscribe(res => {
        this.reservedDates = res;
        this.reservedDateSliced = this.reservedDates.map(date =>new Date(date))
        console.log(this.reservedDateSliced);
      });
    });

  }

  TotalPrice() {
    this.reservationService.totalPrice(this.reservation.accommodationId.toString(),
      this.reservation.startDate,
      this.reservation.endDate,
      this.reservation.numGuests).subscribe(res => {
      this.totalPrice = res
      console.log(res)
    });
  }
}
