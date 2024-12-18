import { Component, OnInit } from '@angular/core';

interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  status: 'active' | 'inactive';
  bookings: number;
  revenue: number;
  imageUrl?: string;
}

@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.css'],
})
export class PropertyManagementComponent implements OnInit {
  properties: Property[] = [];
  showModal: boolean = false;
  editMode: boolean = false;
  selectedProperty: Property | null = null;

  newProperty: Partial<Property> = {
    title: '',
    price: 0,
    location: '',
    status: 'active',
    bookings: 0,
    revenue: 0,
    imageUrl: '',
  };

  constructor() {}

  ngOnInit() {
    // You can fetch data from your backend here
    this.properties = [
      {
        id: 1,
        title: 'Luxury Beach House',
        price: 250,
        location: 'Miami',
        status: 'active',
        bookings: 12,
        revenue: 3000,
        imageUrl: 'assets/beach-house.jpg', // Example image
      },
    ];
  }

  // Open modal for add/edit
  openModal(property?: Property) {
    this.editMode = !!property;
    this.selectedProperty = property || null;
    this.newProperty = property
      ? { ...property }
      : { title: '', price: 0, location: '', status: 'active', imageUrl: '' };
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
    this.newProperty = {};
  }

  // Handle file input for image upload
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.newProperty.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Save new or edited property
  saveProperty() {
    if (this.editMode && this.selectedProperty) {
      const index = this.properties.findIndex(
        (p) => p.id === this.selectedProperty!.id
      );
      if (index !== -1) {
        this.properties[index] = { ...this.newProperty } as Property;
      }
    } else {
      const newId =
        this.properties.length > 0
          ? Math.max(...this.properties.map((p) => p.id)) + 1
          : 1;
      this.properties.push({ id: newId, ...this.newProperty } as Property);
    }
    this.closeModal();
  }

  // Toggle property status (active/inactive)
  togglePropertyStatus(property: Property) {
    property.status = property.status === 'active' ? 'inactive' : 'active';
  }

  deleteProperty(property: Property) {
    const confirmed = confirm(
      `Are you sure you want to delete the property "${property.title}"?`
    );
    if (confirmed) {
      this.properties = this.properties.filter((p) => p.id !== property.id);
    }
  }
}
