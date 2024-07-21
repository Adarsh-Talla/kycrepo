import { Component, OnInit } from '@angular/core';
import { KycService } from '../kyc.service';
import { Kyc, KycStatus } from '../models/kyc.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  kycs: Kyc[] = [];
  errorMessage: string = '';

  constructor(private kycService: KycService) {}

  ngOnInit(): void {
    this.loadKycs();
  }

  loadKycs(): void {
    this.kycService.getAllKyc().subscribe({
      next: (kycs: Kyc[]) => {
        this.kycs = kycs;
      },
      error: (err: any) => {
        this.errorMessage = `Failed to load KYCs: ${err.message || 'Unknown error'}`;
      }
    });
  }

  approveKyc(id: number): void {
    this.kycService.updateKycStatus(id, KycStatus.APPROVED).subscribe({
      next: () => {
        this.updateKycStatus(id, KycStatus.APPROVED);
      },
      error: (err: any) => {
        this.errorMessage = `Failed to approve KYC: ${err.message || 'Unknown error'}`;
      }
    });
  }

  rejectKyc(id: number): void {
    this.kycService.updateKycStatus(id, KycStatus.REJECTED).subscribe({
      next: () => {
        this.updateKycStatus(id, KycStatus.REJECTED);
      },
      error: (err: any) => {
        this.errorMessage = `Failed to reject KYC: ${err.message || 'Unknown error'}`;
      }
    });
  }

  private updateKycStatus(id: number, status: KycStatus): void {
    const kyc = this.kycs.find(k => k.id === id);
    if (kyc) {
      kyc.kycStatus = status;
    }
  }
}
