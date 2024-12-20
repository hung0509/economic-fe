import { Injectable } from "@angular/core";
import { ErroHandle } from "./handleError.service";
import { catchError, map, Observable, of } from "rxjs";
import { ApiResponse } from "../dto/response/api.response";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class DiscountService{
    private api_url: string = "http://localhost:8080/economic-service/discounts";

    constructor(private errorHandler: ErroHandle, private httpClient: HttpClient, private route: Router){}

    public getAll(page: number, size: number): Observable<ApiResponse<any>>{
        return this.httpClient.get<ApiResponse<any>>(`${this.api_url}?page=${page}&size=${size}`)
    }

    public createDiscount(): Observable<ApiResponse<any>>{
        const date = new Date(); // Lấy ngày hiện tại
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Thêm 1 vì tháng bắt đầu từ 0
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        const discountRequest: any = {start_at: formattedDate, active: true}
        return this.httpClient.post<ApiResponse<any>>(this.api_url, discountRequest).pipe(
            map((res: ApiResponse<any>) => {
                return res;
            }),
            catchError(err => {return this.errorHandler.handleApiError(err)})
        );
    }

    public deleteDiscount(id: string): Observable<string>{
        return this.httpClient.delete<ApiResponse<any>>(`${this.api_url}/${id}`).pipe(
                map((res: ApiResponse<any>) => {
                    if(res.code === 0)
                        return "Discount invalid!";
                    return "Có lỗi xảy ra ở đây!";
                }),
                catchError( err => {return this.errorHandler.handleApiError(err)})
        )
    }

    public totalDiscount(): Observable<any>{
        return this.httpClient.get<ApiResponse<any>>(`${this.api_url}/count`).pipe(
            map((res: ApiResponse<any>) => {return res.result}
        ) ,catchError(() =>{
            return of(0);
        }))
    }
}