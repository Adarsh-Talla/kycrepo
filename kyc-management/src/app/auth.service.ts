import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'customer', password: 'customer123', role: 'customer' }
  ];

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(user => user.username === username && user.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  register(username: string, password: string, role: string): boolean {
    const userExists = this.users.some(user => user.username === username);
    if (userExists) {
      return false;
    } else {
      this.users.push({ username, password, role });
      return true;
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  getRole(): string {
    const currentUser = this.getCurrentUser();
    return currentUser.role || '';
  }
}
