import { Component, OnInit } from '@angular/core';
import {User} from "../../../../core/auth/models/user";
import {Accommodation} from "../../../../core/models/accommodation";
import {MatTableDataSource} from "@angular/material/table";
import {AccommodationService} from "../../../../core/services/accommodation.service";
import {Router} from "@angular/router";
import {TokenService} from "../../../../core/services/token.service";

@Component({
  selector: 'app-accommodation-host',
  templateUrl: './accommodation-host.component.html',
  styleUrls: ['./accommodation-host.component.scss']
})
export class AccommodationHostComponent implements OnInit {

  user: User | null = null;
  errorMessage = '';
  image:string = '';

  path: string = "url('src/assets/images/" + this.image + ");";
  public accommodations: Accommodation[] = [];

  public dataSource = new MatTableDataSource<Accommodation>();
  accommodation: Accommodation | undefined;

  constructor(private accommodationService: AccommodationService, private router: Router, private ts:TokenService) { }

  ngOnInit(): void {
    this.accommodationService.getByHostId(Number(this.ts.getIdFromToken())).subscribe(res => {
      this.accommodations = res;
      this.dataSource.data = this.accommodations;
    })
  }

  chooseAccommodation(id: string) {

    this.router.navigate(['/accommodation/', id]);
  }
}
