import { Component, OnInit } from '@angular/core';

interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  imageUrl: string;
  beds: number;
  baths: number;
  rating: number;
}

@Component({
  selector: 'app-property-search',
  templateUrl: './property-search.component.html',
  styleUrls: ['./property-search.component.css'],
})
export class PropertySearchComponent implements OnInit {
  properties: Property[] = [];
  searchTerm: string = '';
  priceRange: number = 1000;
  selectedLocation: string = '';

  // State for booking modal
  showBookingModal: boolean = false;
  selectedProperty: Property | null = null;

  constructor() {}

  ngOnInit() {
    this.properties = [
      {
        id: 1,
        title: 'Luxury Beach House',
        description: 'Beautiful beachfront property with amazing views',
        price: 250,
        location: 'Miami',
        imageUrl: 'assets/house1.jpg',
        beds: 3,
        baths: 2,
        rating: 4.8,
      },
      {
        id: 2,
        title: 'Cozy Mountain Cabin',
        description: 'Quiet retreat in the mountains',
        price: 150,
        location: 'Denver',
        imageUrl: 'assets/cabin.jpg',
        beds: 2,
        baths: 1,
        rating: 4.7,
      },    ];
  }

  openBookingModal(property: Property) {
    this.selectedProperty = property;
    this.showBookingModal = true;
  }

  closeBookingModal() {
    this.showBookingModal = false;
    this.selectedProperty = null;
  }

  confirmBooking() {
    // Handle booking confirmation (send to backend or update booking state)
    alert('Booking confirmed for ' + this.selectedProperty?.title);
    this.closeBookingModal();
  }
}
