import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    CustomerDashboardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Add this line
    ReactiveFormsModule // Add this line if using reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
