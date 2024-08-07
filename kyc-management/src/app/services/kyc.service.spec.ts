import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { KycDTO, KycStatus, KycType } from '../models/kyc.model';
import { KycService } from './kyc.service';

describe('KycService', () => {
  let service: KycService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [KycService]
    });
    service = TestBed.inject(KycService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save KYC', () => {
    const dummyKyc: KycDTO = {
      id: 1,
      userName: 'user',
      kycType: KycType.ID_PROOF,
      kycStatus: KycStatus.SUBMITTED,
      documentDetails: 'details'
    };

    service.saveKyc(dummyKyc).subscribe(kyc => {
      expect(kyc).toEqual(dummyKyc);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyKyc);
  });

  it('should update KYC', () => {
    const dummyKyc: KycDTO = {
      id: 1,
      userName: 'user',
      kycType: KycType.ID_PROOF,
      kycStatus: KycStatus.APPROVED,
      documentDetails: 'details'
    };

    service.updateKyc(dummyKyc).subscribe(kyc => {
      expect(kyc).toEqual(dummyKyc);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyKyc);
  });

  it('should delete KYC', () => {
    service.deleteKyc(1).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should get KYC by id', () => {
    const dummyKyc: KycDTO = {
      id: 1,
      userName: 'user',
      kycType: KycType.ID_PROOF,
      kycStatus: KycStatus.APPROVED,
      documentDetails: 'details'
    };

    service.getKycById(1).subscribe(kyc => {
      expect(kyc).toEqual(dummyKyc);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyKyc);
  });

  it('should get all KYCs', () => {
    const dummyKycs: KycDTO[] = [
      {
        id: 1,
        userName: 'user1',
        kycType: KycType.ID_PROOF,
        kycStatus: KycStatus.APPROVED,
        documentDetails: 'details1'
      },
      {
        id: 2,
        userName: 'user2',
        kycType: KycType.ADDRESS_PROOF,
        kycStatus: KycStatus.SUBMITTED,
        documentDetails: 'details2'
      }
    ];

    service.getAllKycs().subscribe(kycs => {
      expect(kycs.length).toBe(2);
      expect(kycs).toEqual(dummyKycs);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyKycs);
  });

  it('should approve KYC', () => {
    const dummyKyc: KycDTO = {
      id: 1,
      userName: 'user',
      kycType: KycType.ID_PROOF,
      kycStatus: KycStatus.APPROVED,
      documentDetails: 'details'
    };

    service.approveKyc(1).subscribe(kyc => {
      expect(kyc).toEqual(dummyKyc);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1/approve`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyKyc);
  });

  it('should reject KYC', () => {
    const dummyKyc: KycDTO = {
      id: 1,
      userName: 'user',
      kycType: KycType.ID_PROOF,
      kycStatus: KycStatus.REJECTED,
      documentDetails: 'details'
    };

    service.rejectKyc(1).subscribe(kyc => {
      expect(kyc).toEqual(dummyKyc);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1/reject`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyKyc);
  });
});
