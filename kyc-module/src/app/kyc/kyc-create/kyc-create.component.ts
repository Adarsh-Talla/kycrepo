import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { KycDTO } from '../../core/kyc-dto.model';
import { KycService } from '../../core/kyc.service';

@Component({
  selector: 'app-kyc-create',
  templateUrl: './kyc-create.component.html',
  styleUrls: ['./kyc-create.component.css']
})
export class KycCreateComponent {
  kyc: KycDTO = {
    id: 0,
    userId: 0,
    kycType: '',
    kycStatus: '',
    documentDetails: ''
  };

  constructor(private kycService: KycService, private router: Router) {}

  createKyc() {
    this.kycService.createKyc(this.kyc).subscribe(
      response => {
        // Handle successful creation, e.g., show success message, navigate to list view
        console.log('KYC created successfully', response);
        this.router.navigate(['/kycs']);
      },
      error => {
        // Handle creation error
        console.error('Failed to create KYC', error);
      }
    );
  }
}
