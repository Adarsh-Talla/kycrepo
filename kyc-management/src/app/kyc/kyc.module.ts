import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { KycDetailComponent } from './kyc-detail/kyc-detail.component';
import { KycFormComponent } from './kyc-form/kyc-form.component';



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
