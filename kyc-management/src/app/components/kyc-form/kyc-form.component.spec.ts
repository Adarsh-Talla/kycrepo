// kyc-form.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { KycDTO, KycStatus, KycType } from '../../models/kyc.model';
import { AuthService } from '../../services/auth.service';
import { KycService } from '../../services/kyc.service';
import { KycFormComponent } from './kyc-form.component';

const mockKycService = {
  getKycById: jest.fn(),
  saveKyc: jest.fn(),
  updateKyc: jest.fn()
};

const mockAuthService = {
  currentUserValue: { username: 'testUser' }
};

const mockRouter = {
  navigate: jest.fn()
};

const mockActivatedRoute = {
  snapshot: { paramMap: { get: jest.fn() } }
};

describe('KycFormComponent', () => {
  let component: KycFormComponent;
  let fixture: ComponentFixture<KycFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycFormComponent ],
      providers: [
        { provide: KycService, useValue: mockKycService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KycFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with current user and load KYC data if ID is provided', () => {
    mockActivatedRoute.snapshot.paramMap.get.mockReturnValue('1');
    const mockKyc: KycDTO = { id: 1, userName: 'testUser', kycType: KycType.ID_PROOF, kycStatus: KycStatus.SUBMITTED, documentDetails: 'details' };
    mockKycService.getKycById.mockReturnValue(of(mockKyc));

    component.ngOnInit();

    expect(component.isUpdating).toBe(true);
    expect(component.kyc).toEqual(mockKyc);
  });

  it('should handle form submission', () => {
    component.kyc = { userName: 'testUser', documentDetails: 'details', kycType: KycType.ID_PROOF, kycStatus: KycStatus.SUBMITTED };
    mockKycService.saveKyc.mockReturnValue(of(null));

    component.onSubmit();

    expect(component.successMessage).toBe('Your KYC has been successfully submitted!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer-dashboard']);
  });

  it('should handle form submission with update', () => {
    component.isUpdating = true;
    component.kyc = { userName: 'testUser', documentDetails: 'details', kycType: KycType.ID_PROOF, kycStatus: KycStatus.SUBMITTED };
    mockKycService.updateKyc.mockReturnValue(of(null));

    component.onSubmit();

    expect(component.successMessage).toBe('Your KYC has been successfully submitted!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/customer-dashboard']);
  });

  it('should handle error during form submission', () => {
    component.kyc = { userName: 'testUser', documentDetails: 'details', kycType: KycType.ID_PROOF };
    mockKycService.saveKyc.mockReturnValue(throwError(() => new Error('Error')));

    component.onSubmit();

    expect(component.successMessage).toBeNull();
    expect(component.errorMessage).toBe('Error submitting KYC.'); // Ensure error message is set
  });

  it('should not submit the form if KYC Type or Document Details are missing', () => {
    component.kyc = { userName: 'testUser' };

    component.onSubmit();

    expect(component.successMessage).toBeNull();
    expect(component.errorMessage).toBe('KYC Type and Document Details are required'); // Ensure error message is set
  });
});
