import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CustomerLoginComponent } from './customer-login.component';

const mockAuthService = {
  loginCustomer: jest.fn()
};

const mockRouter = {
  navigate: jest.fn()
};

describe('CustomerLoginComponent', () => {
  let component: CustomerLoginComponent;
  let fixture: ComponentFixture<CustomerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerLoginComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to customer-dashboard on successful login', () => {
    mockAuthService.loginCustomer.mockReturnValue(of(null));

    component.username = 'testUser';
    component.password = 'testPass';
    component.onSubmit();

    expect(mockAuthService.loginCustomer).toHaveBeenCalledWith('testUser', 'testPass');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer-dashboard']);
    expect(component.error).toBe('');
  });

  it('should set error message on login failure', () => {
    mockAuthService.loginCustomer.mockReturnValue(throwError(() => new Error('Error')));

    component.username = 'testUser';
    component.password = 'testPass';
    component.onSubmit();

    expect(mockAuthService.loginCustomer).toHaveBeenCalledWith('testUser', 'testPass');
    expect(component.error).toBe('Invalid username or password');
  });
});
