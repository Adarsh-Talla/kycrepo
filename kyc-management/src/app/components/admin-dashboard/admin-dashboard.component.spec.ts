import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { KycDTO, KycStatus, KycType } from '../../models/kyc.model';
import { KycService } from '../../services/kyc.service';
import { AdminDashboardComponent } from './admin-dashboard.component';

const mockKycService = {
  getAllKycs: jest.fn(),
  approveKyc: jest.fn(),
  rejectKyc: jest.fn(),
  deleteKyc: jest.fn()
};

const mockSnackBar = {
  open: jest.fn()
};

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDashboardComponent ],
      providers: [
        { provide: KycService, useValue: mockKycService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load KYC list on initialization', () => {
    const mockKycList: KycDTO[] = [
      { id: 1, userName: 'user1', kycType: KycType.ID_PROOF, kycStatus: KycStatus.PENDING, documentDetails: 'details1' },
      { id: 2, userName: 'user2', kycType: KycType.ADDRESS_PROOF, kycStatus: KycStatus.PENDING, documentDetails: 'details2' }
    ];
    mockKycService.getAllKycs.mockReturnValue(of(mockKycList));

    component.ngOnInit();

    expect(component.kycList).toEqual(mockKycList);
  });

  it('should handle error when loading KYC list', () => {
    mockKycService.getAllKycs.mockReturnValue(throwError(() => new Error('Error')));

    component.loadKycList();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Error fetching KYC list', 'Close', { duration: 3000 });
  });

  it('should approve KYC and show success message', () => {
    mockKycService.approveKyc.mockReturnValue(of(null));

    component.approveKyc(1);

    expect(mockKycService.approveKyc).toHaveBeenCalledWith(1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('KYC approved successfully', 'Close', { duration: 3000 });
  });

  it('should handle error when approving KYC', () => {
    mockKycService.approveKyc.mockReturnValue(throwError(() => new Error('Error')));

    component.approveKyc(1);

    expect(mockSnackBar.open).toHaveBeenCalledWith('Error approving KYC', 'Close', { duration: 3000 });
  });

  it('should reject KYC and show success message', () => {
    mockKycService.rejectKyc.mockReturnValue(of(null));

    component.rejectKyc(1);

    expect(mockKycService.rejectKyc).toHaveBeenCalledWith(1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('KYC rejected successfully', 'Close', { duration: 3000 });
  });

  it('should handle error when rejecting KYC', () => {
    mockKycService.rejectKyc.mockReturnValue(throwError(() => new Error('Error')));

    component.rejectKyc(1);

    expect(mockSnackBar.open).toHaveBeenCalledWith('Error rejecting KYC', 'Close', { duration: 3000 });
  });

  it('should delete KYC and show success message', () => {
    mockKycService.deleteKyc.mockReturnValue(of(null));

    component.deleteKyc(1);

    expect(mockKycService.deleteKyc).toHaveBeenCalledWith(1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('KYC deleted successfully', 'Close', { duration: 3000 });
  });

  it('should handle error when deleting KYC', () => {
    mockKycService.deleteKyc.mockReturnValue(throwError(() => new Error('Error')));

    component.deleteKyc(1);

    expect(mockSnackBar.open).toHaveBeenCalledWith('Error deleting KYC', 'Close', { duration: 3000 });
  });
});
