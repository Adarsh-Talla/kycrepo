import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Admin } from './admin.model';
import { AdminService } from './admin.service';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<Admin | Customer | null>;
  public currentUser: Observable<Admin | Customer | null>;

  constructor(
    private adminService: AdminService,
    private customerService: CustomerService,
    private cookieService: CookieService
  ) {
    const storedUser = this.cookieService.get('currentUser');
    this.currentUserSubject = new BehaviorSubject<Admin | Customer | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Admin | Customer | null {
    return this.currentUserSubject.value;
  }

  loginAdmin(username: string, password: string): Observable<Admin> {
    return this.adminService.authenticate(username, password).pipe(
      map((admin: Admin) => {
        this.cookieService.set('currentUser', JSON.stringify(admin), 1, '/');
        this.currentUserSubject.next(admin);
        return admin;
      }),
      catchError(error => {
        if (error.status === 401) {
          return throwError(() => new Error('Invalid username or password'));
        } else {
          return throwError(() => new Error('An unexpected error occurred'));
        }
      })
    );
  }

  loginCustomer(username: string, password: string): Observable<Customer> {
    return this.customerService.authenticate(username, password).pipe(
      map((customer: Customer) => {
        this.cookieService.set('currentUser', JSON.stringify(customer), 1, '/');
        this.currentUserSubject.next(customer);
        return customer;
      }),
      catchError(error => {
        if (error.status === 401) {
          return throwError(() => new Error('Invalid username or password'));
        } else {
          return throwError(() => new Error('An unexpected error occurred'));
        }
      })
    );
  }

  logout() {
    this.cookieService.delete('currentUser', '/');
    this.currentUserSubject.next(null);
  }

  isAdmin(): boolean {
    const user = this.currentUserValue;
    return !!user && !('phoneNumber' in user);
  }

  registerAdmin(admin: Admin): Observable<Admin> {
    return this.adminService.register(admin);
  }

  registerCustomer(customer: Customer): Observable<Customer> {
    return this.customerService.register(customer);
  }
}
