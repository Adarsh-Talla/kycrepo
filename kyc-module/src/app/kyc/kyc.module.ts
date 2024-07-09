import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KycListComponent } from './kyc-list/kyc-list.component';
import { KycDetailComponent } from './kyc-detail/kyc-detail.component';
import { KycEditComponent } from './kyc-edit/kyc-edit.component';
import { KycCreateComponent } from './kyc-create/kyc-create.component';



@NgModule({
  declarations: [
    KycListComponent,
    KycDetailComponent,
    KycEditComponent,
    KycCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class KycModule { }
