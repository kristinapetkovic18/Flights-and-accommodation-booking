/*
        public string AirportDestination { get; set; }
        public string AirportDeparture { get; set; }
        public DateTime DepartureTime { get; set; }
        public int NumPassengers { get; set; }*/

export class SearchRequestDto {
  airportDestination : string = "";
  airportDeparture : string = "";
  departureTime :  string =  "2022-12-12T00:00:05Z";
  numPassengers : number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.airportDeparture = obj.airportDeparture;
      this.airportDestination = obj.airportDestination;
      this.numPassengers = obj.numPassengers;
      this.departureTime = obj.departureTime;
    }

  }
}
