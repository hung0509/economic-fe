import { AndressResponse } from "../response/andress.response"

export class UpdateUser {
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    address: AndressResponse;
  
    constructor(password: string, firstname: string,lastname: string, 
        email: string, phone: string, andress: AndressResponse) {
            this.address = andress;
            this.email = email;
            this.firstname = firstname;
            this.lastname = lastname;
            this.password = password;
            this.phone = phone;
    }
  }
