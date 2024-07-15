import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { KycDTO } from '../../models/kyc.model';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-kyc-detail',
  templateUrl: './kyc-detail.component.html',
  styleUrls: ['./kyc-detail.component.css']
})
export class KycDetailComponent implements OnInit {
  kyc: KycDTO | undefined;

  constructor(private route: ActivatedRoute, private kycService: KycService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.kycService.getKyc(id).subscribe(data => {
      this.kyc = data;
    });
  }
}
