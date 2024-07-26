import { Component, OnInit } from '@angular/core';
import { KycDTO } from '../../models/kyc.model';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  kycList: KycDTO[] = [];

  constructor(private kycService: KycService) { }

  ngOnInit() {
    this.loadKycList();
  }

  loadKycList() {
    this.kycService.getAllKycs().subscribe(
      (data) => {
        this.kycList = data;
      },
      (error) => {
        console.error('Error fetching KYC list:', error);
      }
    );
  }

  approveKyc(id: number) {
    this.kycService.approveKyc(id).subscribe(
      () => {
        this.loadKycList();
      },
      (error) => {
        console.error('Error approving KYC:', error);
      }
    );
  }

  deleteKyc(id: number) {
    this.kycService.deleteKyc(id).subscribe(
      () => {
        this.loadKycList();
      },
      (error) => {
        console.error('Error deleting KYC:', error);
      }
    );
  }

  rejectKyc(id: number) {
    this.kycService.rejectKyc(id).subscribe(
      () => {
        this.loadKycList();
      },
      (error) => {
        console.error('Error rejecting KYC:', error);
      }
    );
  }
}