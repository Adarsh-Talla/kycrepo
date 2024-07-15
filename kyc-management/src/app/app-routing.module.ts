import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CustomerDashboardComponent } from './customer/customer-dashboard/customer-dashboard.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycFormComponent } from './kyc/kyc-form/kyc-form.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';

const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'customer', component: CustomerDashboardComponent },
  { path: 'kyc/list', component: KycListComponent },
  { path: 'kyc/detail/:id', component: KycDetailComponent },
  { path: 'kyc/form', component: KycFormComponent },
  { path: '**', redirectTo: 'customer', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
