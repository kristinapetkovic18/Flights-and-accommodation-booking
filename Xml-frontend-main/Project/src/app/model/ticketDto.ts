
export class TicketDto {
  userId: string = "";
  flightId : string = "";
  amount : number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.userId = obj.userId;
      this.flightId = obj.flightId;
      this.amount = obj.amount;
    }

  }
}
