
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      localStorage.setItem('currentUser', JSON.stringify(response));
      if (response.role === 'ADMIN') {
        this.router.navigate(['/admin-dashboard']);
      } else if (response.role === 'CUSTOMER') {
        this.router.navigate(['/customer-dashboard']);
      }
    }, error => {
      alert('Invalid credentials');
    });
  }
}

