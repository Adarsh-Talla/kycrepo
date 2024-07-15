// login.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;
  error: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        () => {
          // Navigate based on user role (admin or customer)
          this.router.navigate(['/dashboard']); // Replace with appropriate redirect
        },
        error => {
          this.error = 'Invalid username or password'; // Handle login errors
        }
      );
  }
}
