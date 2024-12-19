import { Component, OnInit } from '@angular/core';
import { PropertyService, Property } from '../../../services/property.service';
import { BookingService } from '../../../services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
})
export class PropertySearchComponent implements OnInit {
  properties: Property[] = [];
  filteredProperties: Property[] = [];
  isLoading = false;
  errorMessage = '';
  searchForm: FormGroup;
  bookingForm: FormGroup;
  showBookingModal = false;
  selectedProperty: Property | null = null;

  constructor(
    private propertyService: PropertyService,
    private bookingService: BookingService,
    private fb: FormBuilder
  ) {
    this.searchForm = this.fb.group({
      searchTerm: [''],
      minPrice: [''],
      maxPrice: [''],
      location: [''],
    });

    this.bookingForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadProperties();
    this.searchForm.valueChanges.subscribe(() => {
      this.filterProperties();
    });
  }

  loadProperties() {
    this.isLoading = true;
    this.propertyService.getProperties().subscribe({
      next: (properties) => {
        console.log('Properties:', properties);
        this.properties = properties.filter((p) => p.status === 'active');
        this.filteredProperties = [...this.properties];
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load properties';
        this.isLoading = false;
        console.error('Error fetching properties:', error);      },
    });
  }

  filterProperties() {
    const { searchTerm, minPrice, maxPrice, location } = this.searchForm.value;

    this.filteredProperties = this.properties.filter((property) => {
      let matches = true;

      if (searchTerm) {
        matches =
          matches &&
          property.title.toLowerCase().includes(searchTerm.toLowerCase());
      }

      if (minPrice) {
        matches = matches && property.price >= minPrice;
      }

      if (maxPrice) {
        matches = matches && property.price <= maxPrice;
      }

      if (location) {
        matches =
          matches &&
          property.location.toLowerCase().includes(location.toLowerCase());
      }

      return matches;
    });
  }

  openBookingModal(property: Property) {
    this.selectedProperty = property;
    this.showBookingModal = true;
    this.bookingForm.reset();
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.selectedProperty = null;
    this.bookingForm.reset();
  }

  calculateTotalPrice(): number {
    if (!this.selectedProperty || !this.bookingForm.valid) return 0;

    const checkIn = new Date(this.bookingForm.value.checkIn);
    const checkOut = new Date(this.bookingForm.value.checkOut);
    const days = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );

    return days * this.selectedProperty.price;
  }

  submitBooking() {
    if (!this.selectedProperty || !this.bookingForm.valid) return;

    const bookingData = {
      propertyId: this.selectedProperty._id,
      checkIn: this.bookingForm.value.checkIn,
      checkOut: this.bookingForm.value.checkOut,
      totalPrice: this.calculateTotalPrice(),
    };

    this.bookingService.createBooking(bookingData).subscribe({
      next: () => {
        alert('Booking request submitted successfully!');
        this.closeBookingModal();
      },
      error: (error) => {
        this.errorMessage = 'Failed to submit booking request';
        console.error('Error:', error);
      },
    });
  }
}
