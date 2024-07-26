// src/app/components/customer-register/customer-register.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../../models/customer.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent {
  customer: Customer = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.registerCustomer(this.customer).subscribe(
      () => {
        this.router.navigate(['/customer-login']);
      },
      (error: any) => {
        this.error = 'Registration failed. Please try again.';
      }
    );
  }
}
