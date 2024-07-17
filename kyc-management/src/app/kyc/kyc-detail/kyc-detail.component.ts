import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KycService } from '../../kyc.service';

@Component({
  selector: 'app-kyc-detail',
  templateUrl: './kyc-detail.component.html',
  styleUrls: ['./kyc-detail.component.css']
})
export class KycDetailComponent implements OnInit {
  id!: number ;
  kyc: any;

  constructor(private route: ActivatedRoute, private router: Router, private kycService: KycService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadKycDetail();
  }

  loadKycDetail() {
    this.kycService.getKycById(this.id).subscribe(data => {
      this.kyc = data;
    });
  }

  updateKyc() {
    this.kycService.updateKyc(this.id, this.kyc).subscribe(() => {
      this.router.navigate(['/kyc-list']);
    });
  }

  goBack() {
    this.router.navigate(['/kyc-list']);
  }
}
