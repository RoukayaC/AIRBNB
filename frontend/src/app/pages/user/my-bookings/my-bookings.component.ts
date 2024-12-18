import { Component, OnInit } from '@angular/core';

interface Booking {
  id: number;
  propertyTitle: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'approved' | 'rejected';
}

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [
    {
      id: 1,
      propertyTitle: 'Luxury Beach House',
      guestName: 'John Doe',
      checkIn: new Date('2024-01-10'),
      checkOut: new Date('2024-01-15'),
      status: 'approved',
    },
    {
      id: 2,
      propertyTitle: 'City Center Apartment',
      guestName: 'Jane Smith',
      checkIn: new Date('2024-02-01'),
      checkOut: new Date('2024-02-05'),
      status: 'pending',
    },
  ];

  ngOnInit() {}
}
