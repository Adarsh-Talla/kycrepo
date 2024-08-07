import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { KycDTO, KycStatus, KycType } from '../../models/kyc.model';
import { AuthService } from '../../services/auth.service';
import { KycService } from '../../services/kyc.service';
import { CustomerDashboardComponent } from './customer-dashboard.component';

const mockKycService = {
  getAllKycs: jest.fn(),
  deleteKyc: jest.fn()
};

const mockAuthService = {
  currentUserValue: { username: 'testUser' }
};

const mockRouter = {
  navigate: jest.fn()
};

describe('CustomerDashboardComponent', () => {
  let component: CustomerDashboardComponent;
  let fixture: ComponentFixture<CustomerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDashboardComponent ],
      providers: [
        { provide: KycService, useValue: mockKycService },
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load KYC list on initialization', () => {
    const mockKycList: KycDTO[] = [
      { id: 1, userName: 'testUser', kycType: KycType.ID_PROOF, kycStatus: KycStatus.PENDING, documentDetails: 'details' }
    ];
    mockKycService.getAllKycs.mockReturnValue(of(mockKycList));

    component.ngOnInit();

    expect(mockKycService.getAllKycs).toHaveBeenCalled();
    expect(component.kycList).toEqual(mockKycList);
  });

  it('should update KYC by navigating to KYC form', () => {
    const kyc: KycDTO = { id: 1, userName: 'testUser', kycType: KycType.ID_PROOF, kycStatus: KycStatus.PENDING, documentDetails: 'details' };
    
    component.updateKyc(kyc);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/kyc-form', { id: kyc.id }]);
  });

  it('should delete KYC and reload the list', () => {
    const mockKycList: KycDTO[] = [
      { id: 1, userName: 'testUser', kycType: KycType.ID_PROOF, kycStatus: KycStatus.PENDING, documentDetails: 'details' }
    ];
    mockKycService.getAllKycs.mockReturnValue(of(mockKycList));
    mockKycService.deleteKyc.mockReturnValue(of(null));

    component.deleteKyc(1);

    expect(mockKycService.deleteKyc).toHaveBeenCalledWith(1);
    expect(mockKycService.getAllKycs).toHaveBeenCalled();
    expect(component.kycList).toEqual(mockKycList);
  });

  it('should handle error while deleting KYC', () => {
    mockKycService.deleteKyc.mockReturnValue(throwError(() => new Error('Error')));

    component.deleteKyc(1);

    expect(mockKycService.deleteKyc).toHaveBeenCalledWith(1);
  });
});
