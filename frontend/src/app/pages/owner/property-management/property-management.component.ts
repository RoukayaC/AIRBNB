import { Component, OnInit } from '@angular/core';
import {
  Property,
  PropertyService,
  PropertyData,
} from '../../../services/property.service';
@Component({
  selector: 'app-property-management',
  templateUrl: './property-management.component.html',
  styleUrls: ['./property-management.component.css'],
})
export class PropertyManagementComponent implements OnInit {
  properties: Property[] = [];
  showModal: boolean = false;
  file: File | undefined;
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

  errorMessage: string = ''; // For form validation messages

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.fetchPropertiesFromServer();
  }

  fetchPropertiesFromServer() {
    this.propertyService.getOwnerProperties().subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      },
      (error: any) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  openModal(property?: Property) {
    console.log('Property:', property);
    this.editMode = !!property;
    this.selectedProperty = property || null;
    this.newProperty = property
      ? { ...property }
      : {
          title: '',
          price: 0,
          location: '',
          status: 'active',
          imageUrl: '',
        };
    this.errorMessage = '';
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.newProperty = {};
    this.selectedProperty = null;
    this.editMode = false;
    this.errorMessage = '';
  }

  // Handle file input
  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (file) {
      this.file = file;
    }
  }
  saveProperty() {
    // Validate form data
    if (
      !this.newProperty.title ||
      !this.newProperty.location ||
      !this.newProperty.price
    ) {
      this.errorMessage = 'All fields except image are required.';
      return;
    }

    const propertyData: PropertyData = {
      title: this.newProperty.title,
      price: this.newProperty.price,
      location: this.newProperty.location,
      imageUrl: this.newProperty.imageUrl,
    };

    if (this.editMode && this.selectedProperty?._id) {
      this.propertyService
        .updateProperty(this.selectedProperty._id, propertyData, this.file)
        .subscribe(
          (updatedProperty) => {
            this.closeModal();
            this.fetchPropertiesFromServer();
          },
          (error) => console.error('Error updating property:', error)
        );
    } else {
      this.propertyService.createProperty(propertyData, this.file).subscribe(
        (response) => {
          this.closeModal();
          this.fetchPropertiesFromServer();
        },
        (error) => console.error('Error creating property:', error)
      );
    }
  }

  togglePropertyStatus(property: Property) {
    this.propertyService.togglePropertyStatus(property._id).subscribe(
      () => {
        this.fetchPropertiesFromServer();
      },
      (error: any) => {
        console.error('Error toggling property status:', error);
      }
    );
  }

  deleteProperty(property: Property) {
    const confirmed = confirm(
      `Are you sure you want to delete the property "${property.title}"?`
    );
    if (confirmed) {
      this.propertyService.deleteProperty(property._id).subscribe(
        () => {
          this.fetchPropertiesFromServer();
        },
        (error: any) => {
          console.error('Error deleting property:', error);
        }
      );
    }
  }
}
