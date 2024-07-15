// auth.service.ts


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  register(user: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/logout`, {});
  }

  isLoggedIn(): boolean {
    // Implement your logic to check if user is logged in
    // Example: return localStorage.getItem('token') !== null;
    return true; // Placeholder, replace with actual logic
  }

  isAdmin(): boolean {
    // Implement your logic to check if user is admin
    // Example: return this.currentUser.role === 'admin';
    return false; // Placeholder, replace with actual logic
  }
}
