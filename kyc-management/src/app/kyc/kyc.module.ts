import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { KycCreateComponent } from './kyc-create/kyc-create.component';
import { KycDetailComponent } from './kyc-detail/kyc-detail.component';
import { KycListComponent } from './kyc-list/kyc-list.component';

@NgModule({
  declarations: [
    KycListComponent,
    KycDetailComponent,
    KycCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class KycModule { }
