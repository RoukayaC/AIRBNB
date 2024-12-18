import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl = 'http://localhost:3000/api/property'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  getProperties(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createProperty(propertyData: any): Observable<any> {
    return this.http.post(this.apiUrl, propertyData);
  }

  updateProperty(id: string, propertyData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, propertyData);
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
