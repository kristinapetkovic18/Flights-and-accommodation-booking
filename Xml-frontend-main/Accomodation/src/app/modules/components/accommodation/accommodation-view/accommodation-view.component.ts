import { Component, OnInit } from '@angular/core';
import {Room} from "../../../hospital/model/room.model";
import {RoomService} from "../../../hospital/services/room.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Accommodation} from "../../../../core/models/accommodation";
import {AccommodationService} from "../../../../core/services/accommodation.service";

@Component({
  selector: 'app-accommodation-view',
  templateUrl: './accommodation-view.component.html',
  styleUrls: ['./accommodation-view.component.css']
})
export class AccommodationViewComponent implements OnInit {

  public accommodation: Accommodation | undefined;
 public id: any;
  constructor(private accommodationService: AccommodationService, private route: ActivatedRoute, private  router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.accommodationService.get(params['id']).subscribe(res => {
        this.accommodation = res;
        this.id = this.accommodation.id
      })
    });
  }

  createReservation() {
    this.router.navigate(['/reservations/create', this.id]);
  }
}
