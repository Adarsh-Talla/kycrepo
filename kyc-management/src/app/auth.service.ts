import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Admin, Role, User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api'; // Base URL for the API
  private tokenKey = 'authToken';
  private currentUserKey = 'currentUser';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  adminLogin(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/auth/admin/login`, { username, password }).pipe(
      map(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.currentUserKey, JSON.stringify(response.user));
        return true;
      }),
      catchError(() => of(false))
    );
  }

  customerLogin(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string, user: User }>(`${this.apiUrl}/auth/customer/login`, { username, password }).pipe(
      map(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.currentUserKey, JSON.stringify(response.user));
        return true;
      }),
      catchError(() => of(false))
    );
  }

  adminRegister(admin: Admin): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/auth/admin/register`, admin).pipe(
      map(response => response.success),
      catchError(() => of(false))
    );
  }

  customerRegister(user: User): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/auth/customer/register`, user).pipe(
      map(response => response.success),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.currentUserKey);
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): Observable<boolean> {
    return of(this.getCurrentUser() !== null);
  }

  getRoles(): Role[] {
    const user = this.getCurrentUser();
    return user ? user.roles : [];
  }
}
