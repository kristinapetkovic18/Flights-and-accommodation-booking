import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-accommodation-homepage',
  templateUrl: './accommodation-all.component.html',
  styleUrls: ['./accommodation-all.component.scss']
})
export class AccommodationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.router.navigate(['/login']);
  }

}
