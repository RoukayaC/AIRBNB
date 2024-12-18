import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OwnerDashboardComponent } from './pages/owner/owner-dashboard/owner-dashboard.component';
import { PropertyManagementComponent } from './pages/owner/property-management/property-management.component';
import { BookingRequestsComponent } from './pages/owner/booking-requests/booking-requests.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { PropertySearchComponent } from './pages/user/property-search/property-search.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OwnerDashboardComponent,
    PropertyManagementComponent,
    BookingRequestsComponent,
    UserDashboardComponent,
    PropertySearchComponent,
    MyBookingsComponent,
    NavbarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
