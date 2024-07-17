
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
  role: string = 'CUSTOMER'; // default role

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    this.authService.register(this.username, this.password, this.role).subscribe(response => {
      alert('Registration successful');
      this.router.navigate(['/login']);
    }, error => {
      alert('Registration failed');
    });
  }
}