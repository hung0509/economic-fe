import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { user } from '../dto/response/user.response';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../dto/response/api.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080/economic-service/users";

  constructor(private authService: AuthService, private httpClient: HttpClient) { }

  getMyInfo(): Observable<ApiResponse<user>>{ 
      const username = this.authService.getUsernameFromToken();
      return this.httpClient.get<ApiResponse<user>>(`${this.baseUrl}/info/${username}`).pipe(
        catchError(error => { 
          console.error('Error fetching user info:', error); 
          return throwError('Error fetching user info, please try again later.');
        }
      ))
  }

  updateInfo(userUpdate: any): Observable<ApiResponse<user>>{
    const uid = this.authService.getUIDFromToken();
    return this.httpClient.put<ApiResponse<user>>(`${this.baseUrl}/${uid}`, userUpdate).pipe(
      catchError(error => { 
        console.error('Error fetching user info:', error); 
        return throwError('Error fetching user info, please try again later.');
      }
    )
  )}

}
