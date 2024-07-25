import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.customerLogin(this.username, this.password).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/customer-dashboard']);
        } else {
          this.errorMessage = 'Invalid username or password';
        }
      },
      error: (err: any) => this.errorMessage = `Login failed: ${err.message || 'Unknown error'}`
    });
  }
}
