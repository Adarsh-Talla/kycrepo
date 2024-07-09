import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycDTO } from '../../core/kyc-dto.model';
import { KycService } from '../../core/kyc.service';

@Component({
  selector: 'app-kyc-edit',
  templateUrl: './kyc-edit.component.html',
  styleUrls: ['./kyc-edit.component.css']
})
export class KycEditComponent implements OnInit {
  kyc: KycDTO = {
    id: 0,
    userId: 0,
    kycType: '',
    kycStatus: '',
    documentDetails: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private kycService: KycService) {}

  ngOnInit(): void {
    const kycId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadKyc(kycId);
  }

  loadKyc(id: number) {
    this.kycService.getKyc(id).subscribe(
      data => {
        this.kyc = data;
      },
      error => {
        console.error('Error loading KYC', error);
      }
    );
  }

  updateKyc() {
    this.kycService.updateKyc(this.kyc).subscribe(
      response => {
        // Handle successful update, e.g., show success message, navigate to detail view
        console.log('KYC updated successfully', response);
        this.router.navigate(['/kycs', this.kyc.id]);
      },
      error => {
        // Handle update error
        console.error('Failed to update KYC', error);
      }
    );
  }
}
