import { Component, OnInit } from '@angular/core';
import { KycService } from '../../kyc.service';
import { Kyc } from '../../models/kyc.model';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.css']
})
export class KycListComponent implements OnInit {
  kycs: Kyc[] = [];

  constructor(private kycService: KycService) { }

  ngOnInit(): void {
    this.kycService.getKycs().subscribe(data => {
      this.kycs = data;
    });
  }

  approveKyc(id: number) {
    this.kycService.updateKycStatus(id, 'APPROVED').subscribe(() => {
      this.ngOnInit(); // Refresh the list
    });
  }

  rejectKyc(id: number) {
    this.kycService.updateKycStatus(id, 'REJECTED').subscribe(() => {
      this.ngOnInit(); // Refresh the list
    });
  }
}
