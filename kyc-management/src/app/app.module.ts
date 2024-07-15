import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AdminModule } from './admin/admin.module';
import { AppComponent } from './app.component';
import { CustomerModule } from './customer/customer.module';
import { KycModule } from './kyc/kyc.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CustomerModule,
    AdminModule,
    KycModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
