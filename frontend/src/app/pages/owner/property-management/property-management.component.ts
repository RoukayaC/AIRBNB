import { Component, OnInit } from '@angular/core';
import { Property } from '../../../services/property.service';
import { PropertyService } from '../../../services/property.service';
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

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    this.fetchPropertiesFromServer();
  }

  fetchPropertiesFromServer() {
    this.propertyService.getProperties().subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      },
      (error: any) => {
        console.error('Error fetching properties:', error);
      }
    );
  }

  // Open modal for add/edit
  openModal(property?: Property) {
    this.editMode = !!property;
    this.selectedProperty = property || null;
    this.newProperty = property
      ? {
          _id: property._id,
          title: property.title,
          price: property.price,
          location: property.location,
          status: property.status,
          imageUrl: property.imageUrl,
        }
      : {
          title: '',
          price: 0,
          location: '',
          status: 'active',
          imageUrl: '',
        };
    this.showModal = true;
  }

  // Close modal
  closeModal() {
    this.showModal = false;
    this.newProperty = {};
    this.selectedProperty = null;
    this.editMode = false;
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
    const formData = new FormData();
    formData.append('title', this.newProperty.title || '');
    formData.append('price', String(this.newProperty.price || 0));
    formData.append('location', this.newProperty.location || '');
    if (
      this.newProperty.imageUrl &&
      typeof this.newProperty.imageUrl === 'string'
    ) {
      formData.append('imageUrl', this.newProperty.imageUrl);
    }

    if (this.editMode && this.selectedProperty && this.selectedProperty._id) {
      // Update property
      this.propertyService
        .updateProperty(this.selectedProperty._id, formData)
        .subscribe(
          (updatedProperty: Property) => {
            this.closeModal();
            this.fetchPropertiesFromServer();
          },
          (error: any) => {
            console.error('Error updating property:', error);
          }
        );
    } else {
      // Create property
      this.propertyService.createProperty(formData).subscribe(
        (newProp: Property) => {
          this.closeModal();
          this.fetchPropertiesFromServer();
        },
        (error: any) => {
          console.error('Error creating property:', error);
        }
      );
    }
  }

  // Toggle property status (active/inactive)
  togglePropertyStatus(property: Property) {
    this.propertyService.togglePropertyStatus(property._id).subscribe(
      (updatedProperty: Property) => {
        this.fetchPropertiesFromServer();
      },
      (error: any) => {
        console.error('Error toggling property status:', error);
      }
    );
  }

  // Delete property
  deleteProperty(property: Property) {
    const confirmed = confirm(
      `Are you sure you want to delete the property "${property.title}"?`
    );
    if (confirmed) {
      this.propertyService.deleteProperty(property._id).subscribe(
        (resp: any) => {
          this.fetchPropertiesFromServer();
        },
        (error: any) => {
          console.error('Error deleting property:', error);
        }
      );
    }
  }
}
