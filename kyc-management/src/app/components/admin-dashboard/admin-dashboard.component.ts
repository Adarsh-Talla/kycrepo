import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KycDTO } from '../../models/kyc.model';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  kycList: KycDTO[] = [];

  constructor(
    private kycService: KycService,
    private snackBar: MatSnackBar
  ) { }

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
        this.snackBar.open('Error fetching KYC list', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  approveKyc(id: number) {
    this.kycService.approveKyc(id).subscribe(
      () => {
        this.loadKycList();
        this.snackBar.open('KYC approved successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error approving KYC:', error);
        this.snackBar.open('Error approving KYC', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  rejectKyc(id: number) {
    this.kycService.rejectKyc(id).subscribe(
      () => {
        this.loadKycList();
        this.snackBar.open('KYC rejected successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error rejecting KYC:', error);
        this.snackBar.open('Error rejecting KYC', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  deleteKyc(id: number) {
    this.kycService.deleteKyc(id).subscribe(
      () => {
        this.loadKycList();
        this.snackBar.open('KYC deleted successfully', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        console.error('Error deleting KYC:', error);
        this.snackBar.open('Error deleting KYC', 'Close', {
          duration: 3000,
        });
      }
    );
  }
}
