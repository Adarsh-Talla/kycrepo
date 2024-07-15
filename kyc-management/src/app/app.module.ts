import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AppComponent } from './app.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycFormComponent } from './kyc/kyc-form/kyc-form.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    KycListComponent,
    KycDetailComponent,
    KycFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
