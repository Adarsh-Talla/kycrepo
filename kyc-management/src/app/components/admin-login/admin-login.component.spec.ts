import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AdminLoginComponent } from './admin-login.component';

const mockAuthService = {
  loginAdmin: jest.fn()
};

const mockRouter = {
  navigate: jest.fn()
};

describe('AdminLoginComponent', () => {
  let component: AdminLoginComponent;
  let fixture: ComponentFixture<AdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLoginComponent ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in admin and navigate on success', () => {
    mockAuthService.loginAdmin.mockReturnValue(of(null));

    component.onSubmit();

    expect(mockAuthService.loginAdmin).toHaveBeenCalledWith(component.username, component.password);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin-dashboard']);
  });

  it('should handle error during login', () => {
    mockAuthService.loginAdmin.mockReturnValue(throwError(() => new Error('Error')));

    component.onSubmit();

    expect(component.error).toBe('Invalid username or password');
  });
});
