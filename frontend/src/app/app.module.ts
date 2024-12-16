import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { OwnerDashboardComponent } from './pages/owner/owner-dashboard/owner-dashboard.component';
import { PropertyManagementComponent } from './pages/owner/property-management/property-management.component';
import { BookingRequestsComponent } from './pages/owner/booking-requests/booking-requests.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { PropertySearchComponent } from './pages/user/property-search/property-search.component';
import { MyBookingsComponent } from './pages/user/my-bookings/my-bookings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    OwnerDashboardComponent,
    PropertyManagementComponent,
    BookingRequestsComponent,
    UserDashboardComponent,
    PropertySearchComponent,
    MyBookingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
