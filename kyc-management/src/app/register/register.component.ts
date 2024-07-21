import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Role, User } from '../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    roles: [Role.USER] // Default role as USER
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.validateUser(this.user)) {
      this.authService.register(this.user).subscribe({
        next: (success: boolean) => {
          if (success) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'Username already exists';
          }
        },
        error: () => {
          this.errorMessage = 'An error occurred. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  validateUser(user: User): boolean {
    return !!(user.username && user.password && user.firstName && user.lastName);
  }
}
