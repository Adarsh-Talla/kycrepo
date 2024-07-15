import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Import your guard classes here

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule // Import RouterModule for route guards
  ],
  providers: [
    AuthGuard // Provide your guard classes here
    // You can add more guards as needed
  ]
})
export class GuardsModule { }
