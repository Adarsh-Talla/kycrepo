// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerRegisterComponent } from './components/customer-register/customer-register.component';
import { HomeComponent } from './components/home/home.component';
import { KycFormComponent } from './components/kyc-form/kyc-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'customer-login', component: CustomerLoginComponent },
  { path: 'admin-register', component: AdminRegisterComponent },
  { path: 'customer-register', component: CustomerRegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'customer-dashboard', component: CustomerDashboardComponent },
  { path: 'kyc-form', component: KycFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }