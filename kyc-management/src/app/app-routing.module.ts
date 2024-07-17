import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AuthGuard } from './auth.guard';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { KycCreateComponent } from './kyc/kyc-create/kyc-create.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard], data: { role: 'CUSTOMER' } },
  { path: 'kyc-create', component: KycCreateComponent, canActivate: [AuthGuard], data: { role: 'CUSTOMER' } },
  { path: 'kyc-list', component: KycListComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } },
  { path: 'kyc-detail/:id', component: KycDetailComponent, canActivate: [AuthGuard], data: { role: 'ADMIN' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
