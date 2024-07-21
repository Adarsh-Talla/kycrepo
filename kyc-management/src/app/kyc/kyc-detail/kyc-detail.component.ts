import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycService } from '../../kyc.service';
import { Kyc, KycStatus } from '../../models/kyc.model';

@Component({
  selector: 'app-kyc-detail',
  templateUrl: './kyc-detail.component.html',
  styleUrls: ['./kyc-detail.component.css']
})
export class KycDetailComponent implements OnInit {
  id!: number;
  kyc: Kyc | undefined;
  errorMessage: string = '';
  kycStatusValues = Object.values(KycStatus); // Define the KYC status values

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kycService: KycService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];  // Ensure id is a number
    this.loadKycDetail();
  }

  loadKycDetail() {
    this.kycService.getKycById(this.id).subscribe({
      next: (data: Kyc) => {
        this.kyc = data;
      },
      error: (err: any) => {
        this.errorMessage = `Failed to load KYC detail: ${err.message || 'Unknown error'}`;
      }
    });
  }

  updateKyc() {
    if (this.kyc) {
      this.kycService.updateKyc(this.id, this.kyc).subscribe({
        next: () => {
          this.router.navigate(['/kyc-list']);
        },
        error: (err: any) => {
          this.errorMessage = `Failed to update KYC: ${err.message || 'Unknown error'}`;
        }
      });
    }
  }

  goBack() {
    this.router.navigate(['/kyc-list']);
  }
}
