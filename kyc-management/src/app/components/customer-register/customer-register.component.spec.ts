import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CustomerRegisterComponent } from './customer-register.component';

const mockAuthService = {
  registerCustomer: jest.fn()
};

const mockRouter = {
  navigate: jest.fn()
};

describe('CustomerRegisterComponent', () => {
  let component: CustomerRegisterComponent;
  let fixture: ComponentFixture<CustomerRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerRegisterComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to customer-login on successful registration', () => {
    mockAuthService.registerCustomer.mockReturnValue(of(null));

    component.customer = {
      username: 'testUser',
      password: 'testPass',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phoneNumber: '1234567890'
    };
    component.onSubmit();

    expect(mockAuthService.registerCustomer).toHaveBeenCalledWith(component.customer);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer-login']);
    expect(component.error).toBe('');
  });

  it('should set error message on registration failure', () => {
    mockAuthService.registerCustomer.mockReturnValue(throwError(() => new Error('Error')));

    component.customer = {
      username: 'testUser',
      password: 'testPass',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phoneNumber: '1234567890'
    };
    component.onSubmit();

    expect(mockAuthService.registerCustomer).toHaveBeenCalledWith(component.customer);
    expect(component.error).toBe('Registration failed. Please try again.');
  });
});
