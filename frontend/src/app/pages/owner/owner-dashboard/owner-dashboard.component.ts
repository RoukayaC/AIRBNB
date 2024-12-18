import { Component } from '@angular/core';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css'],
})
export class OwnerDashboardComponent {
  stats = [
    { label: 'Total Properties', value: 12 },
    { label: 'Active Bookings', value: 34 },
    { label: 'Revenue This Month', value: '$12,500' },
    { label: 'Pending Requests', value: 8 },
  ];
}
