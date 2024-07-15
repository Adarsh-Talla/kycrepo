import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { KycCreateComponent } from './kyc/kyc-create/kyc-create.component';
import { KycDetailComponent } from './kyc/kyc-detail/kyc-detail.component';
import { KycEditComponent } from './kyc/kyc-edit/kyc-edit.component';
import { KycListComponent } from './kyc/kyc-list/kyc-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'kycs', component: KycListComponent },
  { path: 'kycs/create', component: KycCreateComponent },
  { path: 'kycs/:id', component: KycDetailComponent },
  { path: 'kycs/:id/edit', component: KycEditComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
