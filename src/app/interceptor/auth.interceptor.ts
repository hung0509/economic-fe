import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError, of } from 'rxjs';
import { AuthenticateResponse } from '../dto/response/auth.response';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Bỏ qua các yêu cầu đến đường dẫn chứa /auth
  if (req.url.includes('/auth')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.getToken();

  let clonedReq = req;

  if (token) {
    // Kiểm tra token hợp lệ
    return authService.introspect(token).pipe(
      switchMap((isValid: boolean) => {
        if (isValid) {
          // Nếu token hợp lệ, đính token vào header và tiếp tục yêu cầu
          clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });
          return next(clonedReq);
        } else {
          // Nếu token không hợp lệ, trả về yêu cầu gốc mà không thêm header
          return next(req);
        }
      }),
      catchError((err: any) => {
        // Nếu gặp lỗi 401, thử làm mới token
        if (err instanceof HttpErrorResponse && err.status === 401) {
          return authService.refreshToken().pipe(
            switchMap((newTokenResponse: AuthenticateResponse) => {
              authService.setToken(newTokenResponse.token);
              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokenResponse.token}`,
                  'Content-Type': 'application/json'
                }
              });
              return next(newAuthReq);
            }),
            catchError((refreshError) => {
              console.error('Refresh token failed:', refreshError);
              authService.logout();
              window.location.href = '/login'; // Chuyển hướng đến trang đăng nhập
              return throwError(() => 'Làm mới token thất bại, vui lòng đăng nhập lại.'); // Trả về thông báo lỗi gọn gàng
            })
          );
        }
        return throwError(() => 'Có lỗi xảy ra, vui lòng thử lại sau.'); // Trả về thông báo lỗi gọn gàng
      })
    );
  }

  // Nếu không đăng nhập, trả về yêu cầu gốc mà không thêm header
  return next(req);
};
