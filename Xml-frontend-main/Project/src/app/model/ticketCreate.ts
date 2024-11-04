
export class TicketCreate{
  userId: string = "";
  flightId : string = "";

  public constructor(obj?: any) {
    if (obj) {
      this.userId = obj.userId;
      this.flightId = obj.flightId;
    }

  }
}
