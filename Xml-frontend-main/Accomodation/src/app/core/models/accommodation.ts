
export class Accommodation {
  id: string = "";
  hostId    : number | undefined;
  locationId : number| undefined;
  pictures  :  string =  "";
  name  :  string =  "";
  minGuests : number| undefined;
  maxGuests : number| undefined;
  autoAcceptReservation : boolean  |undefined;
  priceForOneGuest: boolean  |undefined;
  price : number | undefined;
  wifi : boolean |undefined;
  freeParking : boolean |undefined;
  kitchen : boolean |undefined;
  public constructor(obj?: any) {
    if (obj) {
      this.id = obj.id;
      this.hostId = obj.hostId;
      this.locationId = obj.locationId;
      this.pictures = obj.pictures;
      this.name = obj.name;
      this.minGuests = obj.minGuests;
      this.maxGuests = obj.maxGuests;
      this.autoAcceptReservation = obj.autoAcceptReservation;
      this.price = obj.price;
      this.wifi = obj.wifi;
      this.kitchen = obj.kitchen;
      this.freeParking = obj.freeParking;
    this.priceForOneGuest = obj.priceForOneGuest;}

  }
}
