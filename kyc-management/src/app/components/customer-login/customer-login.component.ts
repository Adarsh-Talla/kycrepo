import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.loginCustomer(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/customer-dashboard']);
      },
      (error: any) => {
        this.error = 'Invalid username or password';
      }
    );
  }
}
