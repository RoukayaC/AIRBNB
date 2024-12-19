import { Component, OnInit } from '@angular/core';
import { BookingService, Booking } from '../../../services/booking.service';

@Component({
  selector: 'app-booking-requests',
  templateUrl: './booking-requests.component.html',
})
export class BookingRequestsComponent implements OnInit {
  bookingRequests: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    // Fetch owner bookings from the API:
    this.bookingService.getOwnerBookings().subscribe({
      next: (bookings: Booking[]) => {
        this.bookingRequests = bookings.map((b) => ({
          id: b._id,
          propertyTitle: b.property.title,
          guestName: b.guest.username,
          checkIn: new Date(b.checkIn),
          checkOut: new Date(b.checkOut),
          status: b.status,
          totalPrice: b.totalPrice,
        }));
      },
      error: (err) => console.error('Error fetching owner bookings:', err),
    });
  }

  approveRequest(id: string) {
    if (confirm('Are you sure you want to approve this request?')) {
      this.bookingService.updateBookingStatus(id, 'approved').subscribe(
        (updatedBooking) => {
          const index = this.bookingRequests.findIndex((br) => br.id === id);
          if (index > -1) {
            this.bookingRequests[index].status = 'approved';
          }
        },
        (error) => console.error('Error approving request:', error)
      );
    }
  }

  rejectRequest(id: string) {
    if (confirm('Are you sure you want to reject this request?')) {
      this.bookingService.updateBookingStatus(id, 'rejected').subscribe(
        (updatedBooking) => {
          const index = this.bookingRequests.findIndex((br) => br.id === id);
          if (index > -1) {
            this.bookingRequests[index].status = 'rejected';
          }
        },
        (error) => console.error('Error rejecting request:', error)
      );
    }
  }
}
