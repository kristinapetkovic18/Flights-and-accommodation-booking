import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Reservation} from "../../../../core/models/reservation";
import {ReservationService} from "../../../../core/services/reservation.service";
import {Router} from "@angular/router";
import {User} from "../../../../core/auth/models/user";
import {ProfileServiceTsService} from "../../../../core/services/profile-service.ts.service";
import {TokenService} from "../../../../core/services/token.service";

@Component({
  selector: 'app-reservation-table',
  templateUrl: './reservation-table.component.html',
  styleUrls: ['./reservation-table.component.css']
})
export class ReservationTableComponent implements OnInit {

  user: User | null = null;
  pageTitle = 'Flights List';
  errorMessage = '';
  public dataSource = new MatTableDataSource<Reservation>();
  public displayedColumns = ['id', 'accommodationId', 'guestId', 'startDate', 'endDate', 'numGuests', 'accepted', 'totalPrice', 'delete'];
  public reservations: Reservation[] = [];
  cancelCount: any;

  constructor(private reservationService: ReservationService,
              private ts:TokenService,private profileService: ProfileServiceTsService,
              private router: Router) { }

  ngOnInit(): void {
    this.reservationService.getByGuestId(Number(this.ts.getIdFromToken())).subscribe(res => {
      this.reservations = res;
      this.dataSource.data = this.reservations;
      /* this.user = this.authService.getUser();
    this.getUserSubscription = this.authService.getUserObservable().subscribe({
      next: (result) => {
        this.user = result
      }
    })*/
    })
  }
  public deleteReservation(reservation: Reservation) {
    this.reservationService.cancel(reservation).subscribe(res => {
      if(!res) alert("You can't cancel a reservation day prior");
      this.reservationService.getByGuestId(Number(this.ts.getIdFromToken())).subscribe(res => {
        this.reservations = res;
        this.dataSource.data = this.reservations;
      })
      this.profileService.get(Number(this.ts.getIdFromToken())).subscribe(res => {
       console.log(res)
      })
    })
  }
  chooseReservation() {

  }

}
