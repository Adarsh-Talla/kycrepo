import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AdminRegisterComponent } from './admin-register.component';

const mockAuthService = {
  registerAdmin: jest.fn()
};

const mockRouter = {
  navigate: jest.fn()
};

describe('AdminRegisterComponent', () => {
  let component: AdminRegisterComponent;
  let fixture: ComponentFixture<AdminRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegisterComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register admin and navigate on success', () => {
    mockAuthService.registerAdmin.mockReturnValue(of(null));

    component.onSubmit();

    expect(mockAuthService.registerAdmin).toHaveBeenCalledWith(component.admin);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin-login']);
  });

  it('should handle error during registration', () => {
    mockAuthService.registerAdmin.mockReturnValue(throwError(() => new Error('Error')));

    component.onSubmit();

    expect(component.error).toBe('Registration failed. Please try again.');
  });
});
