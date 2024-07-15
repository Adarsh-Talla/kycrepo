import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycDTO, KycStatus, KycType } from '../../models/kyc.model';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-kyc-form',
  templateUrl: './kyc-form.component.html',
  styleUrls: ['./kyc-form.component.css']
})
export class KycFormComponent implements OnInit {
  kyc: KycDTO = {
    kycType: KycType.ID_PROOF,
    kycStatus: KycStatus.PENDING,
    documentDetails: '',
    userId: ''
  };

  kycTypes = Object.values(KycType);
  kycStatuses = Object.values(KycStatus);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private kycService: KycService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.kycService.getKyc(id).subscribe(data => {
        this.kyc = data;
      });
    }
  }

  saveKyc(): void {
    if (this.kyc.id) {
      this.kycService.updateKyc(this.kyc).subscribe(() => {
        this.router.navigate(['/kyc/list']);
      });
    } else {
      this.kycService.createKyc(this.kyc).subscribe(() => {
        this.router.navigate(['/kyc/list']);
      });
    }
  }
}
