import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentUser = this.authService.getCurrentUser();
    
    if (this.authService.isLoggedIn() && currentUser) {
      const userRoles = currentUser.roles;

      if (expectedRole && userRoles.includes(expectedRole)) {
        return true;
      }

      this.router.navigate(['/login']);
      return false;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
