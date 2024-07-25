import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { KycService } from './kyc.service';
import { KycCreateComponent } from './kyc/kyc-create/kyc-create.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';
import { LogoutComponent } from './logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    KycCreateComponent,
    KycListComponent,
    KycDetailComponent,
    AdminLoginComponent,
    CustomerLoginComponent,
    AdminRegisterComponent,
    CustomerRegisterComponent,
    NavbarComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    KycService,
    AuthGuard,
    provideHttpClient(withFetch()) // Add this line to enable fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
