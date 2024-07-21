import { Component, OnInit } from '@angular/core';
import { KycService } from '../../kyc.service';
import { Kyc, KycStatus } from '../../models/kyc.model';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.css']
})
export class KycListComponent implements OnInit {
  kycs: Kyc[] = [];

  constructor(private kycService: KycService) { }

  ngOnInit(): void {
    this.loadKycs();
  }

  loadKycs() {
    this.kycService.getAllKyc().subscribe({
      next: (data: Kyc[]) => {
        this.kycs = data;
      },
      error: (err: any) => {
        console.error('Failed to load KYC list:', err.message || 'Unknown error');
      }
    });
  }

  approveKyc(id: number) {
    this.kycService.updateKycStatus(id, KycStatus.APPROVED).subscribe({
      next: () => {
        this.loadKycs(); // Refresh the list
      },
      error: (err: any) => {
        console.error('Failed to approve KYC:', err.message || 'Unknown error');
      }
    });
  }

  rejectKyc(id: number) {
    this.kycService.updateKycStatus(id, KycStatus.REJECTED).subscribe({
      next: () => {
        this.loadKycs(); // Refresh the list
      },
      error: (err: any) => {
        console.error('Failed to reject KYC:', err.message || 'Unknown error');
      }
    });
  }
}
