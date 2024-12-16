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
    ];
  }

  searchProperties() {
    // Implement search logic
  }

  filterByPrice() {
    // Implement price filter
  }
}
