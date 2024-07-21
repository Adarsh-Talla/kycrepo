import { Component, OnInit } from '@angular/core';
import { KycService } from '../kyc.service';
import { Kyc } from '../models/kyc.model';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  userKycs: Kyc[] = [];
  errorMessage: string = '';

  constructor(private kycService: KycService) {}

  ngOnInit(): void {
    this.loadUserKycs();
  }

  loadUserKycs(): void {
    this.kycService.getKycForUser().subscribe({
      next: (kycs: Kyc[]) => {
        this.userKycs = kycs;
      },
      error: (err: any) => {
        this.errorMessage = `Failed to load KYCs: ${err.message || 'Unknown error'}`;
      }
    });
  }
}
