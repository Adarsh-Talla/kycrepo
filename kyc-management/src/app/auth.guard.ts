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

    if (this.authService.isLoggedIn()) {
      if (currentUser) {
        const userRoles = currentUser.roles;

        if (expectedRole) {
          // Handle case where expectedRole might be a single role or an array of roles
          if (Array.isArray(expectedRole)) {
            if (expectedRole.some(role => userRoles.includes(role))) {
              return true;
            }
          } else if (userRoles.includes(expectedRole)) {
            return true;
          }
        }

        // Role does not match
        this.redirectToLogin(expectedRole);
        return false;
      }
    }

    // Not logged in
    this.redirectToLogin(expectedRole);
    return false;
  }

  private redirectToLogin(expectedRole: string | string[]): void {
    // Redirect based on expectedRole
    if (Array.isArray(expectedRole)) {
      // Handle multiple roles if needed
      this.router.navigate(['/customer-login']); // Default to customer login
    } else if (expectedRole === 'ROLE_ADMIN') {
      this.router.navigate(['/admin-login']);
    } else {
      this.router.navigate(['/customer-login']);
    }
  }
}
