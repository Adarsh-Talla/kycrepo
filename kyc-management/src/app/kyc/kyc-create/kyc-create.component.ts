import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KycService } from '../../kyc.service';
import { KycStatus, KycType } from '../../models/kyc.model';

@Component({
  selector: 'app-kyc-create',
  templateUrl: './kyc-create.component.html',
  styleUrls: ['./kyc-create.component.css']
})
export class KycCreateComponent implements OnInit {
  

  kyc = {
    id: 0,
    userId: '',
    kycType: KycType.ID_PROOF, // Default value
    kycStatus: KycStatus.SUBMITTED, // Default value
    documentDetails: ''
  };

  kycTypes = KycType;
  kycStatuses = KycStatus;

  constructor(private kycService: KycService, private router: Router) { }

  ngOnInit(): void {
  }

  createKyc() {
    this.kycService.createKyc(this.kyc).subscribe(() => {
      this.router.navigate(['/kyc-list']);
    });
  }

  goBack() {
    this.router.navigate(['/customer-dashboard']);
  }
}
