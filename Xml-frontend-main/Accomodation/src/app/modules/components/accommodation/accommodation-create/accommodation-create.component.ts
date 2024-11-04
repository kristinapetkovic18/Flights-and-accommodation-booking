import { Component, OnInit } from '@angular/core';
import {ReservationDto} from "../../../../core/dtos/reservationDto";
import {ReservationService} from "../../../../core/services/reservation.service";
import {Router} from "@angular/router";
import {AccommodationDto} from "../../../../core/dtos/accommodationDto";
import {AccommodationService} from "../../../../core/services/accommodation.service";
import {TokenService} from "../../../../core/services/token.service";

@Component({
  selector: 'app-accommodation-create',
  templateUrl: './accommodation-create.component.html',
  styleUrls: ['./accommodation-create.component.css']
})
export class AccommodationCreateComponent implements OnInit {


  public accommodation: AccommodationDto = new AccommodationDto();

  selectedImage: string | null = null;


  constructor(private  accommodationService: AccommodationService, private router: Router, private tokenService: TokenService) {
    this.accommodation.hostId = Number(this.tokenService.getIdFromToken());}

  public createAccommodation(){
    if (this.selectedImage) {
      this.accommodation.pictures = this.selectedImage;
    }
    this.accommodationService.create(this.accommodation).subscribe({
        next: res => {
          console.log(res);
          alert("created accommodation with id "+res.id)

        },
        error: err => {
          console.log(err);
        }
      }
    );
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result as string; // Save the base64-encoded image data to the selectedImage property
    };
    reader.readAsDataURL(file);
  }

  private isValidInput(): boolean {

    return true;}
  ngOnInit(): void {
  }

}
