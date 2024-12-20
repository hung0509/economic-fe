export class AuthenticateResponse {
    token: string;
    success: boolean
    constructor(token: string, isSuccess: boolean){
        this.token = token;
        this.success  = isSuccess;
    }
}
