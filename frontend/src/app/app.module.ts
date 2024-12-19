import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PropertyManagementComponent } from './pages/owner/property-management/property-management.component';
import { BookingRequestsComponent } from './pages/owner/booking-requests/booking-requests.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';
import { PropertySearchComponent } from './pages/user/property-search/property-search.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { OwnerDashboardComponent } from './pages/owner/owner-dashboard/owner-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PropertyManagementComponent,
    BookingRequestsComponent,
    MyBookingsComponent,
    PropertySearchComponent,
    NavbarComponent,
    UserDashboardComponent,
    OwnerDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
