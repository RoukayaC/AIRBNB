import { Component, OnInit } from '@angular/core';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  status: 'active' | 'inactive';
  bookings: number;
  revenue: number;
}

@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.css'],
})
export class PropertyManagementComponent implements OnInit {
  properties: Property[] = [];

  constructor() {}

  ngOnInit() {
    this.properties = [
      {
        id: 1,
        title: 'Luxury Beach House',
        price: 250,
        location: 'Miami',
        status: 'active',
        bookings: 12,
        revenue: 3000,
      },
    ];
  }

  togglePropertyStatus(property: Property) {
    property.status = property.status === 'active' ? 'inactive' : 'active';

    // Implement API call to update status
  }

  deleteProperty(id: number) {
    // Implement delete logic
  }

  editProperty(id: number) {
    // Implement edit logic
  }
}
