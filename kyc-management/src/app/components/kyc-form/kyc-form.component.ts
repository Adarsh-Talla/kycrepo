// kyc-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycDTO, KycStatus, KycType } from '../../models/kyc.model';
import { AuthService } from '../../services/auth.service';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-kyc-form',
  templateUrl: './kyc-form.component.html',
  styleUrls: ['./kyc-form.component.css']
})
export class KycFormComponent implements OnInit {
  kycTypes = Object.values(KycType);
  kyc: Partial<KycDTO> = {};
  isUpdating = false;
  successMessage: string | null = null;
  errorMessage: string | null = null; // Added errorMessage property

  constructor(
    private kycService: KycService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.kyc.userName = currentUser.username;
    }

    const kycId = this.route.snapshot.paramMap.get('id');
    if (kycId) {
      this.isUpdating = true;
      this.loadKyc(+kycId);
    }
  }

  loadKyc(id: number) {
    this.kycService.getKycById(id).subscribe(
      (kyc) => {
        this.kyc = kyc;
      },
      (error) => {
        console.error('Error loading KYC:', error);
        this.errorMessage = 'Error loading KYC data.';
      }
    );
  }

  onSubmit() {
    if (this.kyc.kycType && this.kyc.documentDetails) {
      this.kyc.kycStatus = KycStatus.SUBMITTED;
      const operation = this.isUpdating
        ? this.kycService.updateKyc(this.kyc as KycDTO)
        : this.kycService.saveKyc(this.kyc as KycDTO);

      operation.subscribe(
        () => {
          this.successMessage = 'Your KYC has been successfully submitted!';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['/customer-dashboard']);
          }, 2000);
        },
        (error) => {
          console.error('Error submitting KYC:', error);
          this.errorMessage = 'Error submitting KYC.';
          this.successMessage = null; // Ensure successMessage is set to null on error
        }
      );
    } else {
      this.errorMessage = 'KYC Type and Document Details are required';
      this.successMessage = null; // Ensure successMessage is set to null if validation fails
    }
  }
}
