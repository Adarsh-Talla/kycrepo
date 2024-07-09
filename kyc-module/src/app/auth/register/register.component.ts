import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe(
      response => {
        // Handle successful registration, e.g., show success message, navigate to login
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        // Handle registration error
        console.error('Registration failed', error);
      }
    );
  }
}
