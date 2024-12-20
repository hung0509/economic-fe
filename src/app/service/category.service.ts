import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { ApiResponse } from "../dto/response/api.response";
import { ErroHandle } from './handleError.service';

@Injectable({
    providedIn: "root"
})
export class CateService{
    private baseUrl: string = "http://localhost:8080/economic-service/categories";

    constructor(private httpClient: HttpClient, private handleErr: ErroHandle){}

    getCategories(): Observable<ApiResponse<any>>{
        return this.httpClient.get<ApiResponse<any>>(this.baseUrl).pipe(
            map((res: ApiResponse<any>) => {
                return res;
            }),catchError((err) => of(err) )
        )
    }

    addCategory(name: string): Observable<ApiResponse<any>>{
        return this.httpClient.post<ApiResponse<any>>(this.baseUrl, {name: name}).pipe(
            map((res: ApiResponse<any>) => {
                return res;
            }),
            catchError(err => this.handleErr.handleApiError(err))
        )
    }

}