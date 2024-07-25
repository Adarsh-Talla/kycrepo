import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User, } from '../models/user.model';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
  user: User = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    roles: [ ]
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.customerRegister(this.user).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/customer-login']);
        } else {
          this.errorMessage = 'Registration failed';
        }
      },
      error: (err: any) => this.errorMessage = `Registration failed: ${err.message || 'Unknown error'}`
    });
  }
}
