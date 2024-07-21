import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { KycService } from './kyc.service';
import { KycCreateComponent } from './kyc/kyc-create/kyc-create.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
    KycCreateComponent,    // Add your components here
    KycListComponent,
    KycDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, KycService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
