import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Property {
  _id: string;
  owner: string;
  title: string;
  price: number;
  location: string;
  status: 'active' | 'inactive';
  bookings: number;
  revenue: number;
  imageUrl?: string;
}

export interface PropertyData {
  title: string | undefined;
  price: number | undefined;
  location: string | undefined;
  imageUrl?: string | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  uploadImage(file: File) {
    throw new Error('Method not implemented.');
  }
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http
      .get<{ status: string; properties: Property[] }>(
        this.API_URL + '/properties/search'
      )
      .pipe(map((response) => response.properties));
  }
  getOwnerProperties(): Observable<Property[]> {
    return this.http
      .get<{ status: string; properties: Property[] }>(
        this.API_URL + '/owners/properties'
      )
      .pipe(map((response) => response.properties));
  }
  createProperty(
    propertyData: PropertyData,
    file?: File
  ): Observable<Property> {
    const formData = new FormData();
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append('file', file, file.name);
    }

    return this.http
      .post<{ status: string; property: Property }>(
        this.API_URL + '/properties',
        formData
      )
      .pipe(map((response) => response.property));
  }

  updateProperty(id: string, propertyData: PropertyData, file?: File): Observable<Property> {
    const formData = new FormData();
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append('file', file, file.name);
    }
    return this.http
      .put<{ status: string; property: Property }>(
        `${this.API_URL}/properties/${id}`,
        formData
      )
      .pipe(map((response) => response.property));
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete<{ status: string; msg: string }>(
      `${this.API_URL}/properties/${id}`
    );
  }

  togglePropertyStatus(id: string): Observable<Property> {
    return this.http
      .put<{ status: string; property: Property }>(
        `${this.API_URL}/properties/${id}/status`,
        {}
      )
      .pipe(map((response) => response.property));
  }
}
