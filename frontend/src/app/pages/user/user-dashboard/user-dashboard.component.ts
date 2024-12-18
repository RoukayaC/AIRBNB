import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent {
  dashboardStats = [
    { label: 'Total Bookings', value: 5 },
    { label: 'Active Bookings', value: 2 },
    { label: 'Completed Stays', value: 3 },
    { label: 'Total Spent', value: '$1,500' },
  ];
}
