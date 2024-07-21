import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// Ensure you import Role enum
import { Role, User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // Base URL for the API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ success: boolean, roles: Role[] }>(`${this.apiUrl}/login`, { username, password }).pipe(
      map(response => {
        if (response.success) {
          localStorage.setItem('currentUser', JSON.stringify({ username, roles: response.roles }));
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  register(user: User): Observable<boolean> {
    return this.http.post<{ success: boolean }>(`${this.apiUrl}/register`, user).pipe(
      map(response => response.success),
      catchError(() => of(false))
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
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
