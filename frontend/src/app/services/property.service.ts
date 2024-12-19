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

// Define a separate interface for property creation/update data
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
  private readonly API_URL = 'http://localhost:3000/api/property';

  constructor(private http: HttpClient) {}

  getProperties(): Observable<Property[]> {
    return this.http
      .get<{ status: string; properties: Property[] }>(this.API_URL)
      .pipe(map((response) => response.properties));
  }

  // Now accepts a PropertyData object instead of FormData
  createProperty(propertyData: PropertyData): Observable<Property> {
    return this.http
      .post<{ status: string; property: Property }>(this.API_URL, propertyData)
      .pipe(map((response) => response.property));
  }

  // Same for updateProperty: accept PropertyData instead of FormData
  updateProperty(id: string, propertyData: PropertyData): Observable<Property> {
    return this.http
      .put<{ status: string; property: Property }>(
        `${this.API_URL}/${id}`,
        propertyData
      )
      .pipe(map((response) => response.property));
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete<{ status: string; msg: string }>(
      `${this.API_URL}/${id}`
    );
  }

  togglePropertyStatus(id: string): Observable<Property> {
    return this.http
      .put<{ status: string; property: Property }>(
        `${this.API_URL}/${id}/toggle-status`,
        {}
      )
      .pipe(map((response) => response.property));
  }
}
