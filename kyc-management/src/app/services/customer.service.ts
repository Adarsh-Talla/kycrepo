// src/app/services/customer.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:8080/api/auth/customer';  // Update with your actual customer endpoint

  constructor(private http: HttpClient) {}

  authenticate(username: string, password: string): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/login`, { username, password });
  }

  register(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/register`, customer);
  }
}
