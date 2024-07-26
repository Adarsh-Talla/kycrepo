// src/app/services/admin.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/auth/admin';  // Update with your actual admin endpoint

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseUrl}/login`, { username, password });
  }

  register(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(`${this.baseUrl}/register`, admin);
  }
}
