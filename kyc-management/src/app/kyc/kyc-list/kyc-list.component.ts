import { Component, OnInit } from '@angular/core';
import { KycDTO } from '../../models/kyc.model';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-kyc-list',
  templateUrl: './kyc-list.component.html',
  styleUrls: ['./kyc-list.component.css']
})
export class KycListComponent implements OnInit {
  kycs: KycDTO[] = [];

  constructor(private kycService: KycService) {}

  ngOnInit(): void {
    this.kycService.getKycs().subscribe(data => {
      this.kycs = data;
    });
  }
}
