import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      const userRole = this.authService.getRole();
      const expectedRole = route.data['expectedRole'];

      if (expectedRole && expectedRole !== userRole) {
        this.router.navigate(['/login']);
        return false;
      }

      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}