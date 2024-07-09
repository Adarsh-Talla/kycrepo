import { Component, OnInit } from '@angular/core';
import { KycDTO } from '../../core/kyc-dto.model';
import { KycService } from '../../core/kyc.service';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.css']
})
export class KycListComponent implements OnInit {
  kycs: KycDTO[] = [];

  constructor(private kycService: KycService) {}

  ngOnInit(): void {
    this.loadKycs();
  }

  loadKycs() {
    this.kycService.getKycs().subscribe(
      data => {
        this.kycs = data;
      },
      error => {
        console.error('Error loading KYCs', error);
      }
    );
  }
}
