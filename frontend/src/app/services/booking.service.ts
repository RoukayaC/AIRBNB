import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Booking {
  _id: string;
  property: {
    _id: string;
    title: string;
    imageUrl?: string;
  };
  guest: {
    _id: string;
    username: string;
  };
  checkIn: Date;
  checkOut: Date;
  status: 'pending' | 'approved' | 'rejected';
  totalPrice: number;
}

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  createBooking(bookingData: {
    propertyId: string;
    checkIn: Date;
    checkOut: Date;
    totalPrice: number;
  }): Observable<Booking> {
    return this.http
      .post<{ status: string; booking: Booking }>(this.API_URL + '/bookings', bookingData)
      .pipe(map((response) => response.booking));
  }

  getUserBookings(): Observable<Booking[]> {
    return this.http
      .get<{ status: string; bookings: Booking[] }>(this.API_URL + '/users/bookings')
      .pipe(map((response) => response.bookings));
  }

  getOwnerBookings(): Observable<Booking[]> {
    return this.http
      .get<{ status: string; bookings: Booking[] }>(`${this.API_URL}/owners/bookings`)
      .pipe(map((response) => response.bookings));
  }

  updateBookingStatus(
    bookingId: string,
    status: 'approved' | 'rejected'
  ): Observable<Booking> {
    return this.http
      .put<{ status: string; booking: Booking }>(
        `${this.API_URL}/owners/bookings/${bookingId}/status`,
        { status }
      )
      .pipe(map((response) => response.booking));
  }
}
