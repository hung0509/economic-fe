import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterDTO{
    @IsString()
    @IsNotEmpty()
    firstname:  string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    repassword: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    @IsDate()
    dob: string;

    constructor(data: any){
        this.firstname = data.firstname;
        this.lastname = data.lastname
        this.username = data.username;
        this.password = data.password
        this.repassword = data.repassword;
        this.email = data.email;
        this.phone = data.phone;
        this.dob = data.dob;
    }
}