import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KycService } from '../../kyc.service'; // Ensure the path is correct
import { Kyc, KycStatus, KycType } from '../../models/kyc.model'; // Ensure the path is correct

@Component({
  selector: 'app-kyc-create',
  templateUrl: './kyc-create.component.html',
  styleUrls: ['./kyc-create.component.css']
})
export class KycCreateComponent {
  kyc: Kyc = {
    id: 0,
    userId: '',
    kycType: KycType.ID_PROOF,
    kycStatus: KycStatus.PENDING,
    documentDetails: ''
  };

  kycTypes = KycType;
  kycStatus = KycStatus;

  constructor(private kycService: KycService, private router: Router) {}

  createKyc() {
    this.kycService.createKyc(this.kyc).subscribe(() => {
      this.router.navigate(['/customer-dashboard']);
    });
  }
}
