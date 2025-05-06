import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Partner } from '../Models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
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
    console.error('Error details:', {
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      errorBody: error.error
    });
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error('Network error occurred. Please check your connection.'));
    } else {
      const errorMessage = error.error?.message || JSON.stringify(error.error) || 'Unknown server error';
      return throwError(() => new Error(`Backend returned code ${error.status}, error: ${errorMessage}`));
    }
  }

  getPartners(): Observable<Partner[]> {
    console.log('Fetching partners from:', this.apiUrl);
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
        if (Array.isArray(data)) {
          observer.next(data);
          observer.complete();
          return;
        }
        if (data && typeof data === 'object') {
          const possibleProperties = ['content', 'partners', 'data', 'items', 'results'];
          for (const prop of possibleProperties) {
            if (data[prop] && Array.isArray(data[prop])) {
              observer.next(data[prop]);
              observer.complete();
              return;
            }
          }
          const keys = Object.keys(data);
          if (keys.length > 0) {
            const numericKeys = keys.filter(key => !isNaN(Number(key)));
            if (numericKeys.length > 0) {
              const arrayData = numericKeys.map(key => data[key]);
              observer.next(arrayData);
              observer.complete();
              return;
            }
          }
        }
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

  updatePartner(id: number, partner: Partner): Observable<Partner> {
    const payload = {
      ...partner,
      commissionRate: Number(partner.commissionRate) || 0,
      totalCommission: Number(partner.totalCommission) || 0
    };
    console.log('Updating partner with payload:', payload);
    return this.http.put<Partner>(`${this.apiUrl}/${id}`, payload, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }

  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }
}