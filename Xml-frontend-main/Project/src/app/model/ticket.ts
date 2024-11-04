
export class Ticket{
  userId: string = "";
  flightId : string = "";
  id : string = "";

  public constructor(obj?: any) {
    if (obj) {
      this.userId = obj.userId;
      this.flightId = obj.flightId;
      this.id = obj.id;
    }

  }
}
