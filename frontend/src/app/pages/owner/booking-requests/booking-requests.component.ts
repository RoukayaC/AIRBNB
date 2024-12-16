import { Component, OnInit } from '@angular/core';


interface BookingRequest {
  id: number;
  propertyTitle: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'approved' | 'rejected';
  totalPrice: number;
}

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.css'],
})
export class BookingRequestsComponent implements OnInit {
  bookingRequests: BookingRequest[] = [];

  constructor() {}

  ngOnInit() {
    // Simulated data - replace with actual API call

    this.bookingRequests = [
      {
        id: 1,
        propertyTitle: 'Luxury Beach House',
        guestName: 'John Doe',
        checkIn: new Date('2024-01-15'),
        checkOut: new Date('2024-01-20'),
        status: 'pending',
        totalPrice: 1250,
      },

      // Add more booking requests...
    ];
  }

  approveRequest(id: number) {
    // Implement approve logic
  }

  rejectRequest(id: number) {
    // Implement reject logic
  }
}
