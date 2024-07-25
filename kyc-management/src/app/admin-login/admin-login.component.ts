import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.adminLogin(this.username, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      error: (err: any) => this.errorMessage = `Login failed: ${err.message || 'Unknown error'}`
    });
  }
}
