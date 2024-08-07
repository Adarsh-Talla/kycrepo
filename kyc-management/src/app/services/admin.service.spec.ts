import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Admin } from '../models/admin.model';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService]
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate admin', () => {
    const dummyAdmin: Admin = { username: 'admin', firstName: 'Admin', lastName: 'User' };

    service.authenticate('admin', 'password').subscribe(admin => {
      expect(admin).toEqual(dummyAdmin);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/admin/login');
    expect(req.request.method).toBe('POST');
    req.flush(dummyAdmin);
  });

  it('should register admin', () => {
    const dummyAdmin: Admin = { username: 'admin', firstName: 'Admin', lastName: 'User' };

    service.register(dummyAdmin).subscribe(admin => {
      expect(admin).toEqual(dummyAdmin);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/auth/admin/register');
    expect(req.request.method).toBe('POST');
    req.flush(dummyAdmin);
  });
});
