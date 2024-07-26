import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.loginAdmin(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/admin-dashboard']);
      },
      (error) => {
        this.error = 'Invalid username or password';
      }
    );
  }
}