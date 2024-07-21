import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KycService } from '../../kyc.service';
import { Kyc, KycStatus, KycType } from '../../models/kyc.model';

@Component({
  selector: 'app-kyc-create',
  templateUrl: './kyc-create.component.html',
  styleUrls: ['./kyc-create.component.css']
})
export class KycCreateComponent {
  kyc: Kyc = {
    id: 0,
    userId: '',  // This should be set dynamically based on the logged-in user
    kycType: KycType.ID_PROOF,
    kycStatus: KycStatus.PENDING,
    documentDetails: ''
  };

  kycTypes = Object.values(KycType);  // Convert enum to array for the template
  kycStatus = KycStatus;

  errorMessage: string = '';

  constructor(private kycService: KycService, private router: Router) {}

  createKyc() {
    this.kycService.createKyc(this.kyc).subscribe({
      next: () => {
        this.router.navigate(['/customer-dashboard']);
      },
      error: (err: any) => {
        this.errorMessage = `Failed to create KYC: ${err.message || 'Unknown error'}`;
      }
    });
  }
}
