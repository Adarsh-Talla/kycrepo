import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Customer } from '../models/customer.model';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomerService]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate customer', () => {
    const dummyCustomer: Customer = { id: 1, username: 'customer', firstName: 'Customer', lastName: 'User', email: 'customer@example.com', phoneNumber: '1234567890' };

    service.authenticate('customer', 'password').subscribe(customer => {
      expect(customer).toEqual(dummyCustomer);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/customer/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCustomer);
  });

  it('should register customer', () => {
    const dummyCustomer: Customer = { id: 1, username: 'customer', firstName: 'Customer', lastName: 'User', email: 'customer@example.com', phoneNumber: '1234567890' };

    service.register(dummyCustomer).subscribe(customer => {
      expect(customer).toEqual(dummyCustomer);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/customer/register');
    expect(req.request.method).toBe('POST');
    req.flush(dummyCustomer);
  });
});
