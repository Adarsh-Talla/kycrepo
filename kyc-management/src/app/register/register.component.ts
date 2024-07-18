import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  role: string = 'customer'; // Default role
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (this.authService.register(this.username, this.password, this.role)) {
      this.router.navigate(['/login']);
    } else {
      this.errorMessage = 'Username already exists';
    }
  }
}
