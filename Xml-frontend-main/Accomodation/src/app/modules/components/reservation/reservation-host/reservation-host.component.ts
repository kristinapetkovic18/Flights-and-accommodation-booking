import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Reservation} from "../../../../core/models/reservation";
import {ReservationService} from "../../../../core/services/reservation.service";
import {Router} from "@angular/router";
import {User} from "../../../../core/auth/models/user";
import {ProfileServiceTsService} from "../../../../core/services/profile-service.ts.service";
import {TokenService} from "../../../../core/services/token.service";

@Component({
  selector: 'app-reservation-host',
  templateUrl: './reservation-host.component.html',
  styleUrls: ['./reservation-host.component.css']
})
export class ReservationHostComponent  implements OnInit {

  user: User | null = null;
  pageTitle = 'Flights List';
  errorMessage = '';
  public dataSource = new MatTableDataSource<Reservation>();
  public displayedColumns = ['id', 'accommodationId', 'guestId', 'startDate', 'endDate', 'numGuests', 'accepted', 'totalPrice','accept'];
  public reservations: Reservation[] = [];
  public count: any;

  constructor(private reservationService: ReservationService,
              private profilService : ProfileServiceTsService,
              private ts:TokenService, private router: Router) { }

  ngOnInit(): void {
    this.reservationService.getByHostId(Number(this.ts.getIdFromToken())).subscribe(res => {
      this.reservations = res.sort((a,b) => 0 - (a > b ? 1 : -1));
      this.dataSource.data = this.reservations;
    })
  }


  public acceptReservation(reservation: Reservation ) {
    this.reservationService.acceptReservation(reservation).subscribe(res => {
      this.reservationService.getByHostId(Number(this.ts.getIdFromToken())).subscribe(res => {
        this.reservations = res;
        this.dataSource.data = this.reservations;
      })
    })
  }

  chooseReservation() {

  }

  public disabled(reservation: Reservation){
    //nije obrisana i nije jos prihvacena
    if (reservation.accepted == false){
      return false;
    }
    return true;
  }
  /*CancelCount(guestId: any):number {

    this.profilService.get(guestId).subscribe(res => {
      this.count = res.get().cancelCount;
    })
    return this.count;
  } */

  chooseGuest(guestId: any) {
    this.router.navigate(['/info', guestId]);
  }
}
