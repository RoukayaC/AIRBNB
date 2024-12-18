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
    // Simulated data
    this.bookingRequests = [
      {
        id: 1,
        propertyTitle: 'EL Mouradi',
        guestName: 'Roukaya Chelly',
        checkIn: new Date('2024-01-15'),
        checkOut: new Date('2024-01-20'),
        status: 'pending',
        totalPrice: 150,
      },
      {
        id: 2,
        propertyTitle: 'La badira',
        guestName: 'Foulen Foulani',
        checkIn: new Date('2024-02-10'),
        checkOut: new Date('2024-02-15'),
        status: 'pending',
        totalPrice: 200,
      },
    ];
  }

  approveRequest(id: number) {
    if (confirm('Are you sure you want to approve this request?')) {
      this.updateStatus(id, 'approved');
    }
  }

  rejectRequest(id: number) {
    if (confirm('Are you sure you want to reject this request?')) {
      this.updateStatus(id, 'rejected');
    }
  }

  private updateStatus(id: number, status: 'approved' | 'rejected') {
    this.bookingRequests = this.bookingRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
  }
}
