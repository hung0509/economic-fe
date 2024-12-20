import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";
import { ApiResponse } from "../dto/response/api.response";
import { ErroHandle } from "./handleError.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    private api_url: string = 'http://localhost:8080/economic-service/products';

    constructor(private httpClient: HttpClient, private handleError: ErroHandle){}

    create(data: any): Observable<ApiResponse<any>> {
        return this.httpClient.post<ApiResponse<any>>(`${this.api_url}`, data,).pipe(
            map((res: ApiResponse<any>) => {
                return res;
            }),catchError((error) => {
                return throwError(error)
            })
        )
    }

    getProductById(id: string):Observable<ApiResponse<any>>{
        return this.httpClient.get<ApiResponse<any>>(`${this.api_url}/${id}`).pipe(
            map((res: ApiResponse<any>) =>{
                if(res.code === 0)
                    return res;
                else
                    throw this.handleError.handleApiError(res);  //Khi code #0 thì JSON trả ra sẽ chỉ có code và message
                    // vd PRODUCT_NOT_EXIST {code: 1009, "Product not eccist"}
            })
            ,catchError((error: any) => {
                //Neeus co loi no se tra ve dang {code: ... , message: .....}
                return this.handleError.handleApiError(error);
            })
        );
    }
}