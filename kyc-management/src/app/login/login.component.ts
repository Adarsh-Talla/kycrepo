import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else if (currentUser.role === 'customer') {
        this.router.navigate(['/customer-dashboard']);
      }
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
