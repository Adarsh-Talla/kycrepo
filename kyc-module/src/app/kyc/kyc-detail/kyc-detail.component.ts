import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KycDTO } from '../../core/kyc-dto.model';
import { KycService } from '../../core/kyc.service';

@Component({
  selector: 'app-kyc-detail',
  templateUrl: './kyc-detail.component.html',
  styleUrls: ['./kyc-detail.component.css']
})
export class KycDetailComponent implements OnInit {
  kyc: KycDTO | undefined;

  constructor(private route: ActivatedRoute, private kycService: KycService) {}

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
}
