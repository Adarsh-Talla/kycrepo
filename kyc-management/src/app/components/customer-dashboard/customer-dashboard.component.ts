import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KycDTO } from '../../models/kyc.model';
import { AuthService } from '../../services/auth.service';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  kycList: KycDTO[] = [];

  constructor(
    private kycService: KycService, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadKycList();
  }

  updateKyc(kyc: KycDTO) {
    // Navigate to KYC form with the KYC data for updating
    this.router.navigate(['/kyc-form', { id: kyc.id }]);
  }
  
  deleteKyc(id: number) {
    this.kycService.deleteKyc(id).subscribe(
      () => {
        this.loadKycList();
      },
      (error: any) => {
        console.error('Error deleting KYC:', error);
      }
    );
  }

  loadKycList() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.kycService.getAllKycs().subscribe(
        (data) => {
          this.kycList = data.filter(kyc => kyc.userName === currentUser.username);
        },
        (error: any) => {
          console.error('Error fetching KYC list:', error);
        }
      );
    }
  }
}