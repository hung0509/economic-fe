import { AndressResponse } from "./andress.response";

export class user{
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    andress: AndressResponse
    constructor(username: string, 
        password: string,
        firstname: string, 
        lastname: string,
        email: string,
        phone: string,
        andress: AndressResponse){
            this.username  = username;
            this.password = password;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.phone = phone;
            this.andress = andress;
        }
}