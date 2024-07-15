import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { KycDetailComponent } from './kyc-detail/kyc-detail.component';
import { KycFormComponent } from './kyc-form/kyc-form.component';
import { KycListComponent } from './kyc-list/kyc-list.component';



@NgModule({
  declarations: [
    KycListComponent,
    KycDetailComponent,
    KycFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KycModule { }
