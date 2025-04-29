import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Partner } from '../Models/partner.model';

// Add Partner interface

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  // Use the full URL since proxy isn't working
  private apiUrl = 'http://localhost:8089/examen/partners';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      return throwError(() => new Error('Network error occurred. Please check your connection.'));
    } else {
      // Backend error
      return throwError(() => new Error(`Backend returned code ${error.status}, body was: ${error.error}`));
    }
  }

  // Get all partners
  getPartners(): Observable<Partner[]> {
    console.log('Fetching partners from:', this.apiUrl);
    
    // Use a direct fetch approach to see the raw response
    return new Observable<Partner[]>(observer => {
      fetch(this.apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include'
      })
      .then(response => {
        console.log('Raw fetch response:', response);
        return response.json();
      })
      .then(data => {
        console.log('Parsed fetch response:', data);
        
        // Check if data is an array
        if (Array.isArray(data)) {
          observer.next(data);
          observer.complete();
          return;
        }
        
        // If data is an object, try to extract the partners array
        if (data && typeof data === 'object') {
          // Try different possible property names
          const possibleProperties = ['content', 'partners', 'data', 'items', 'results'];
          
          for (const prop of possibleProperties) {
            if (data[prop] && Array.isArray(data[prop])) {
              observer.next(data[prop]);
              observer.complete();
              return;
            }
          }
          
          // If no array property found, try to convert the object to an array
          const keys = Object.keys(data);
          if (keys.length > 0) {
            // Check if the object has numeric keys (like an array)
            const numericKeys = keys.filter(key => !isNaN(Number(key)));
            if (numericKeys.length > 0) {
              // Convert to array
              const arrayData = numericKeys.map(key => data[key]);
              observer.next(arrayData);
              observer.complete();
              return;
            }
          }
        }
        
        // If we can't extract an array, return empty array
        console.warn('Could not extract partners array from response:', data);
        observer.next([]);
        observer.complete();
      })
      .catch(error => {
        console.error('Error in getPartners fetch:', error);
        observer.next([]);
        observer.complete();
      });
    });
  }

  // Get a single partner by ID
  getPartnerById(id: number): Observable<Partner> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      map(partner => ({
        ...partner,
        commissionRate: partner.commissionRate?.toString() || '0',
        totalCommission: partner.totalCommission?.toString() || '0'
      })),
      catchError(this.handleError)
    );
  }

  // Create a new partner
  createPartner(partner: Partner): Observable<Partner> {
    const payload = {
      ...partner,
      commissionRate: Number(partner.commissionRate) || 0,
      totalCommission: Number(partner.totalCommission) || 0
    };

    return this.http.post<Partner>(`${this.apiUrl}/create`, payload, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Update a partner
  updatePartner(id: number, partner: Partner): Observable<Partner> {
    const payload = {
      ...partner,
      commissionRate: Number(partner.commissionRate) || 0,
      totalCommission: Number(partner.totalCommission) || 0
    };

    return this.http.put<Partner>(`${this.apiUrl}/${id}`, payload, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a partner
  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }
}
