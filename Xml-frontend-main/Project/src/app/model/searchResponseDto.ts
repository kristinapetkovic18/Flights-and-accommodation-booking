/*  public string AirportDestination { get; set; }
        public string AirportDeparture { get; set; }
        public DateTime DepartureTime { get; set; }

        public int Duration { get; set; }

        public int TicketPrice { get; set; }

        public int Capacity { get; set; }

        public int TotalPrice { get; set; }
*/
export class SearchResponseDto {
  airportDestination : string = "";
  airportDeparture : string = "";
  departureTime :  string =  "2022-12-12T00:00:05Z";
  numPassengers : number = 0;
  duration : number = 0;
  ticketPrice : number = 0;
  capacity : number = 0;
  totalPrice : number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.airportDeparture = obj.airportDeparture;
      this.airportDestination = obj.airportDestination;
      this.numPassengers = obj.numPassengers;
      this.departureTime = obj.departureTime;
      this.duration = obj.duration;
      this.ticketPrice = obj.ticketPrice;
      this.capacity = obj.capacity;
      this.totalPrice = obj.totalPrice;
    }

  }
}

