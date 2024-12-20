import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    let roles: string[]|null = this.authService.getRolesFromToken();
    if (this.authService.isLogin() && roles?.includes("ROLE_ADMIN")) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
