import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { catchError, Observable, of, switchMap, map, throwError } from 'rxjs';
import { ApiResponse } from '../dto/response/api.response';
import { AuthenticateResponse } from '../dto/response/auth.response';
import { LoginRequest } from '../dto/request/login.request';
import { isPlatformBrowser } from '@angular/common'
import { introspectResponse } from '../dto/response/introspect.response';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ErroHandle } from './handleError.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  private api_url: string = 'http://localhost:8080/economic-service/auth';

  constructor(private httpClient: HttpClient, 
    @Inject(PLATFORM_ID) private platformId: Object,
    private handleError: ErroHandle
  ) { }

  getToken(): string | null{
    if (isPlatformBrowser(this.platformId))
     return localStorage.getItem("token");
    return null;
  }

  setToken(token: string){
      localStorage.setItem("token", token);
  }

  decodeToken(token: string): any{
    return this.jwtHelper.decodeToken(token);
  }

  getRolesFromToken(): string[] | null {
     const token = this.getToken();
      if (token) {
         const decodedToken = this.decodeToken(token);
        return decodedToken.scope ? decodedToken.scope.split(" ") : null; 
      }
      return null;
  }

  getUsernameFromToken(): string | null{
    const token = this.getToken();
    console.log(token)
      if (token) {
         const decodedToken = this.decodeToken(token);

        return decodedToken.sub;
      }
      return null;
  }

  getUIDFromToken():string | null{
    const token = this.getToken();
      if (token) {
         const decodedToken = this.decodeToken(token);
        return decodedToken.uid;
      }
      return null;
  }

  isRoleAdmin():boolean{
    var roles = this.getRolesFromToken();
    if(roles?.includes("ADMIN"))
      return true;

    return false;
  }

  logout(){
    if (isPlatformBrowser(this.platformId))
      localStorage.removeItem('token');
    //chuyển về trang login
  }

  isLogin(): boolean{
    var token = this.getToken();
    if(token){
      // console.log(token)
       this.introspect(token).subscribe(
        res => {return res},
        err => {return false}
      );
    }
    return false;
  }

  refreshToken(): Observable<AuthenticateResponse>{ // Trả về 1 ApiResponse
    return this.httpClient.post<{api: ApiResponse<AuthenticateResponse>}>(`${this.api_url}/refresh`, this.getToken()).pipe(
      switchMap( (response) => {
         return of(response.api.result); 
      })
    );
  }

  login(loginRequest: LoginRequest): Observable<AuthenticateResponse> {
     return this.httpClient.post<ApiResponse<AuthenticateResponse>>(`${this.api_url}/login`, loginRequest).pipe(
       map(response => {
         if (response.code === 0) {
            this.setToken(response.result.token);//Đặt token
            return response.result;
          } else {
             throw new Error(response.message|| 'Login failed'); 
          } 
        }), catchError((err: any) => {
           return this.handleError.handleApiError(err);
          }) 
        ); 
      }
  introspect(token: string): Observable<boolean>{
    const IntrospectRequest = {token: token}
    return this.httpClient.post<ApiResponse<any>>(`${this.api_url}/introspect`, IntrospectRequest).pipe(
      map((res:ApiResponse<any>) => {
        return res.result.verify;
      }))
  }
}

