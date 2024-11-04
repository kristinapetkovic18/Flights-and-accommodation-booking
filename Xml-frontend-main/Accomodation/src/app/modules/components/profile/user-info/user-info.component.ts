import { Component, OnInit } from '@angular/core';
import {Accommodation} from "../../../../core/models/accommodation";
import {AccommodationService} from "../../../../core/services/accommodation.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "../../../../core/auth/services/auth.service";
import {ProfileServiceTsService} from "../../../../core/services/profile-service.ts.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  public user: any | undefined;
  public id: any;
  constructor(private profileService: ProfileServiceTsService, private route: ActivatedRoute, private  router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.profileService.get(params['id']).subscribe(res => {
        this.user = res;
        this.id = this.user.id
      })
    });
  }
}
