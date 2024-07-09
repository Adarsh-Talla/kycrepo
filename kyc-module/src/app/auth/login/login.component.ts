import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        // Handle successful login, e.g., store token, navigate to dashboard
        console.log('Login successful', response);
        this.router.navigate(['/kycs']);
      },
      error => {
        // Handle login error
        console.error('Login failed', error);
      }
    );
  }
}
