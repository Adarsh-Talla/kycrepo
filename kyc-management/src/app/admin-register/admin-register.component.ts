import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Admin } from '../models/admin.model';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  admin: Admin = {
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.authService.adminRegister(this.admin).subscribe({
      next: (success: boolean) => {
        if (success) {
          this.router.navigate(['/admin-login']);
        } else {
          this.errorMessage = 'Registration failed';
        }
      },
      error: (err: any) => this.errorMessage = `Registration failed: ${err.message || 'Unknown error'}`
    });
  }
}
