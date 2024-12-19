import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../../services/booking.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.isLoading = true;
    this.bookingService.getUserBookings().subscribe({
      next: (bookings) => {
        this.bookings = bookings;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load bookings';
        this.isLoading = false;
        console.error('Error:', error);
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString();
  }

  calculateDuration(checkIn: Date, checkOut: Date): number {
    return Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );
  }
}
