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
    return this.http.get<Partner[]>(`${this.apiUrl}/with-promotions`, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      map(partners => partners.map(partner => ({
        partnerId: partner.partnerId,
        partnerName: partner.partnerName,
        partnerContactInfo: partner.partnerContactInfo,
        partnerCode: partner.partnerCode,
        partnershipDuration: partner.partnershipDuration,
        totalCommission: partner.totalCommission,
        commissionRate: partner.commissionRate,
        promotions: partner.promotions
      }))),
      catchError(this.handleError)
    );
  }

  getPartnerById(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
      withCredentials: true
    }).pipe(
      map(partner => ({
        partnerId: partner.partnerId,
        partnerName: partner.partnerName,
        partnerContactInfo: partner.partnerContactInfo,
        partnerCode: partner.partnerCode,
        partnershipDuration: partner.partnershipDuration,
        totalCommission: partner.totalCommission,
        commissionRate: partner.commissionRate,
        promotions: partner.promotions
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