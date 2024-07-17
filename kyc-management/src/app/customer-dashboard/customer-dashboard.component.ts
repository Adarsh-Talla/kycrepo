import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewKyc() {
    this.router.navigate(['/kyc-list']);
  }

  createKyc() {
    this.router.navigate(['/kyc-create']);
  }
}
