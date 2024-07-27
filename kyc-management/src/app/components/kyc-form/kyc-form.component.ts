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
  kyc: Partial<KycDTO> = {
    userName: '',
    documentDetails: ''
  };
  isUpdating = false;
  successMessage: string | null = null; // Added successMessage property

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
          }, 2000); // Optionally, hide the message after 2 seconds
        },
        (error) => {
          console.error('Error submitting KYC:', error);
        }
      );
    } else {
      console.error('KYC Type and Document Details are required');
    }
  }
}
