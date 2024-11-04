import {Time} from "@angular/common";

export class Flight {
  id: string = "";
  airportDestination : string = "";
  airportDeparture : string = "";
  departureTime :  string =  "2022-04-06T14:50:05Z";
  duration : number = 0;
  ticketPrice : number = 0;
  capacity : number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.airportDeparture = obj.airportDeparture;
      this.airportDestination = obj.airportDestination;
      this.duration = obj.duration;
      this.ticketPrice = obj.ticketPrice;
      this.capacity = obj.capacity;
      this.departureTime = obj.departureTime;
    }

  }
}
