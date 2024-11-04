export enum UserType {
  HOST = 'HOST',
  GUEST = 'GUEST',
}

export class Register {
  email: string = "";
  password: string = "";
  name: string = "";
  surname: string = "";
  cityId: number = 0;
  userType: number = 1;

  constructor(email: string, password: string,
              name: string,  surname: string, cityId: number, userType: number) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.cityId = cityId;
    this.userType = userType;
  }
}
