
export class Reservation {
  id: string = "";
  accommodationId    : string = "";
  guestId : string = "";
  startDate  :  string =  "2023-06-16T14:50:05Z";
  endDate  :  string =  "2023-06-16T14:50:05Z";
  numGuests : number = 0;
  accepted : boolean = false;
  totalPrice : number = 0;

  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.accommodationId = obj.accommodationId;
      this.guestId = obj.guestId;
      this.startDate = obj.startDate;
      this.endDate = obj.endDate;
      this.numGuests = obj.numGuests;
      this.accepted = obj.accepted;
      this.totalPrice = obj.totalPrice;}

  }
}
