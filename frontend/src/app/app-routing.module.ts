import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OwnerDashboardComponent } from './pages/owner/owner-dashboard/owner-dashboard.component';
import { PropertyManagementComponent } from './pages/owner/property-management/property-management.component';
import { BookingRequestsComponent } from './pages/owner/booking-requests/booking-requests.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { PropertySearchComponent } from './pages/user/property-search/property-search.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'owner',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: OwnerDashboardComponent },
      { path: 'properties', component: PropertyManagementComponent },
      { path: 'bookings', component: BookingRequestsComponent },
    ],
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: UserDashboardComponent },
      { path: 'search', component: PropertySearchComponent },
      { path: 'my-bookings', component: MyBookingsComponent },
    ],
  },
  { path: '', redirectTo: '/user/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
