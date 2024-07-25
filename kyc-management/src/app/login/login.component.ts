// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth.service';
// import { Role } from '../models/user.model';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';
//   errorMessage: string = '';

//   constructor(private authService: AuthService, private router: Router) {}

//   onLogin() {
//     this.authService.login(this.username, this.password).subscribe({
//       next: (success: boolean) => {
//         if (success) {
//           const currentUser = this.authService.getCurrentUser();
//           if (currentUser) {  // Check if currentUser is not null
//             if (currentUser.roles.includes(Role.ADMIN)) {
//               this.router.navigate(['/admin-dashboard']);
//             } else if (currentUser.roles.includes(Role.CUSTOMER)) {
//               this.router.navigate(['/customer-dashboard']);
//             } else {
//               this.errorMessage = 'User role not recognized';
//             }
//           } else {
//             this.errorMessage = 'User information not available';
//           }
//         } else {
//           this.errorMessage = 'Invalid username or password';
//         }
//       },
//       error: (err: any) => this.errorMessage = `Login failed: ${err.message || 'Unknown error'}`
//     });
//   }

//   navigateToRegister() {
//     this.router.navigate(['/register']);
//   }
// }
