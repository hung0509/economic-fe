import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { ApiResponse } from "../dto/response/api.response";

@Injectable({
    providedIn: "root"
})
export class ErroHandle{
    public handleApiError(error: any): Observable<never>{
         let apiError: { code: number; message: string}
         if (error && error.code && error.message){
            apiError = { //Lỗi người dùng
                code: error.code,
                message: error.message
            };
         }else{//Lỗi phía server
            apiError = {
                code: 500,
                message: 'An unexpected error occured'
            };
         }
         console.error(`API Error - Code: ${apiError.code}, Message: ${apiError.message}`);
         return throwError(apiError);
    }
}