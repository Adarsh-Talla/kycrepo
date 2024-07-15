// register.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username!: string;
  password!: string;
  error: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register({ username: this.username, password: this.password })
      .subscribe(
        () => {
          // After successful registration, redirect to login page
          this.router.navigate(['/login']);
        },
        error => {
          this.error = 'Registration failed'; // Handle registration errors
        }
      );
  }
}
