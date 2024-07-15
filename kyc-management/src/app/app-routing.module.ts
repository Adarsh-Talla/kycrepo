import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycFormComponent } from './kyc/kyc-form/kyc-form.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'customer', component: CustomerDashboardComponent },
  { path: 'kyc/list', component: KycListComponent },
  { path: 'kyc/detail/:id', component: KycDetailComponent },
  { path: 'kyc/form', component: KycFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'customer', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
