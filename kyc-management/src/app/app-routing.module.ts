import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AuthGuard } from './auth.guard';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { KycCreateComponent } from './kyc/kyc-create/kyc-create.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer-login', pathMatch: 'full' },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'customer-register', component: CustomerRegisterComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'ROLE_ADMIN' } 
  },
  { 
    path: 'customer-dashboard', 
    component: CustomerDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'ROLE_USER' } 
  },
  { 
    path: 'kyc-create', 
    component: KycCreateComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'ROLE_USER' } 
  },
  { 
    path: 'kyc-list', 
    component: KycListComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'ROLE_ADMIN' } 
  },
  { 
    path: 'kyc-detail/:id', 
    component: KycDetailComponent, 
    canActivate: [AuthGuard], 
    data: { expectedRole: 'ROLE_ADMIN' } 
  },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/customer-login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
