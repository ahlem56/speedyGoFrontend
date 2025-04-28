import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Partner } from '../Models/partner.model';

// Add Partner interface

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = 'http://localhost:8089/examen/partners'; 

  constructor(private http: HttpClient) {}

  // Create a new partner
  createPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>(`${this.apiUrl}/create`, partner, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
 
  // Helper method to remove circular references
  private removeCircularReferences(obj: any): any {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    // Create a new object to store the cleaned data
    const cleaned: any = {};

    // Iterate through all properties
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Skip the partners property in simpleUsers to break the circular reference
        if (key === 'partners') {
          continue;
        }

        // Recursively clean nested objects and arrays
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          if (Array.isArray(obj[key])) {
            cleaned[key] = obj[key].map(item => this.removeCircularReferences(item));
          } else {
            cleaned[key] = this.removeCircularReferences(obj[key]);
          }
        } else {
          cleaned[key] = obj[key];
        }
      }
    }

    return cleaned;
  }

  // Get all partners
  getPartners(): Observable<Partner[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        try {
          // If response is an array, clean each item
          if (Array.isArray(response)) {
            return response.map(item => this.removeCircularReferences(item));
          }
          
          // If response is a string, try to parse it
          if (typeof response === 'string') {
            const parsed = JSON.parse(response);
            if (Array.isArray(parsed)) {
              return parsed.map(item => this.removeCircularReferences(item));
            }
            return [this.removeCircularReferences(parsed)];
          }
          
          // If response is an object with data property
          if (response && typeof response === 'object') {
            if (response.data) {
              if (Array.isArray(response.data)) {
                return response.data.map((item: any) => this.removeCircularReferences(item));
              }
              return [this.removeCircularReferences(response.data)];
            }
            // If it's a single object, wrap it in an array
            return [this.removeCircularReferences(response)];
          }
          
          // If none of the above, return empty array
          return [];
        } catch (error) {
          console.error('Error parsing response:', error);
          return [];
        }
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to fetch partners'));
      })
    );
  }

  // Get single partner by ID
  getPartnerById(id: number): Observable<Partner> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        try {
          // If response is an object, clean it
          if (response && typeof response === 'object') {
            return this.removeCircularReferences(response);
          }
          
          // If response is a string, try to parse it
          if (typeof response === 'string') {
            const parsed = JSON.parse(response);
            return this.removeCircularReferences(parsed);
          }
          
          // If none of the above, return empty object
          return {} as Partner;
        } catch (error) {
          console.error('Error parsing response:', error);
          return {} as Partner;
        }
      }),
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => new Error('Failed to fetch partner'));
      })
    );
  }

  // Update a partner
  updatePartner(id: number, partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(`${this.apiUrl}/update/${id}`, partner);
  }
  deletePartner(id: number): Observable<void> {
    const headers = new HttpHeaders().set('X-HTTP-Method-Override', 'DELETE');
    return this.http.post<void>(`${this.apiUrl}/${id}`, null, { headers });
  }
}
