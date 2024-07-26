// src/app/components/admin-register/admin-register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../../models/admin.model';
import { AuthService } from '../../services/auth.service';

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
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.registerAdmin(this.admin).subscribe(
      () => {
        this.router.navigate(['/admin-login']);
      },
      (error: any) => {
        this.error = 'Registration failed. Please try again.';
      }
    );
  }
}
