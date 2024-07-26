import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycDTO, KycType } from '../../models/kyc.model';
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
      const operation = this.isUpdating
        ? this.kycService.updateKyc(this.kyc as KycDTO)
        : this.kycService.saveKyc(this.kyc as KycDTO);

      operation.subscribe(
        () => {
          this.router.navigate(['/customer-dashboard']);
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