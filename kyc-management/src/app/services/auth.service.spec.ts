import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { Admin } from '../models/admin.model';
import { Customer } from '../models/customer.model';
import { AdminService } from './admin.service';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';

describe('AuthService', () => {
  let service: AuthService;
  let adminService: AdminService;
  let customerService: CustomerService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, AdminService, CustomerService, CookieService]
    });
    service = TestBed.inject(AuthService);
    adminService = TestBed.inject(AdminService);
    customerService = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login admin and store admin data in cookies', () => {
    const dummyAdmin: Admin = { username: 'admin', firstName: 'Admin', lastName: 'User' };

    service.loginAdmin('admin', 'password').subscribe(admin => {
      expect(admin).toEqual(dummyAdmin);
      expect(cookieService.get('currentUser')).toBe(JSON.stringify(dummyAdmin));
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/admin/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyAdmin);
  });

  it('should login customer and store customer data in cookies', () => {
    const dummyCustomer: Customer = { id: 1, username: 'customer', firstName: 'Customer', lastName: 'User', email: 'customer@example.com', phoneNumber: '1234567890' };

    service.loginCustomer('customer', 'password').subscribe(customer => {
      expect(customer).toEqual(dummyCustomer);
      expect(cookieService.get('currentUser')).toBe(JSON.stringify(dummyCustomer));
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/customer/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCustomer);
  });

  it('should logout and clear cookies', () => {
    service.logout();
    expect(cookieService.get('currentUser')).toBe('');
  });

  it('should identify admin user correctly', () => {
    const dummyAdmin: Admin = { username: 'admin', firstName: 'Admin', lastName: 'User' };
    cookieService.set('currentUser', JSON.stringify(dummyAdmin));
    service = TestBed.inject(AuthService);

    expect(service.isAdmin()).toBe(true);
  });

  it('should identify customer user correctly', () => {
    const dummyCustomer: Customer = { id: 1, username: 'customer', firstName: 'Customer', lastName: 'User', email: 'customer@example.com', phoneNumber: '1234567890' };
    cookieService.set('currentUser', JSON.stringify(dummyCustomer));
    service = TestBed.inject(AuthService);

    expect(service.isAdmin()).toBe(false);
  });
});
