import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Admin } from '../models/admin.model';
import { Customer } from '../models/customer.model';
import { AdminService } from './admin.service';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Admin | Customer | null>;
  public currentUser: Observable<Admin | Customer | null>;

  constructor(
    private adminService: AdminService,
    private customerService: CustomerService
  ) {
    this.currentUserSubject = new BehaviorSubject<Admin | Customer | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Admin | Customer | null {
    return this.currentUserSubject.value;
  }

  loginAdmin(username: string, password: string): Observable<Admin> {
    return this.adminService.authenticate(username, password).pipe(
      map((admin: Admin) => {
        localStorage.setItem('currentUser', JSON.stringify(admin));
        this.currentUserSubject.next(admin);
        return admin;
      }),
      catchError(error => {
        // Handle error here
        return throwError(() => new Error('Login failed.'));
      })
    );
  }

  loginCustomer(username: string, password: string): Observable<Customer> {
    return this.customerService.authenticate(username, password).pipe(
      map((customer: Customer) => {
        localStorage.setItem('currentUser', JSON.stringify(customer));
        this.currentUserSubject.next(customer);
        return customer;
      }),
      catchError(error => {
        // Handle error here
        return throwError(() => new Error('Login failed.'));
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.currentUserValue;
    return user ? !('email' in user) : false;
  }

  registerAdmin(admin: Admin): Observable<Admin> {
    return this.adminService.register(admin);
  }

  registerCustomer(customer: Customer): Observable<Customer> {
    return this.customerService.register(customer);
  }
}
