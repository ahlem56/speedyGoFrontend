import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface CommissionSummary {
  total: number;
  pending: number;
  paid: number;
}

export interface Commission {
  commissionId: number;
  partnerId: number;
  partnerName?: string; // Updated to match backend
  amount: number;
  calculatedAt: Date;
  paidOut: boolean;
  description?: string;
  status?: string;
  updatedAt?: Date;
}

export interface User {
  userId: number;
  email: string;
  partner?: {
    partnerId: number;
    partnerName: string;
    partnerContactInfo?: string;
    partnerCode?: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private apiUrl = `${environment.apiUrl}/commissions`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let token = localStorage.getItem('token') || '';
    if (token.startsWith('Bearer ')) {
      token = token.split(' ')[1];
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createCommission(commission: Partial<Commission>): Observable<Commission> {
    return this.http
      .post<Commission>(`${this.apiUrl}/create`, commission, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllCommissions(): Observable<Commission[]> {
    return this.http
      .get<Commission[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCommissionsByPartner(partnerId: number): Observable<Commission[]> {
    return this.http
      .get<Commission[]>(`${this.apiUrl}/partner/${partnerId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCommissionSummary(partnerId: number): Observable<CommissionSummary> {
    return this.http
      .get<CommissionSummary>(`${this.apiUrl}/partner/${partnerId}/summary`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCommissionDetails(commissionId: number): Observable<Commission> {
    return this.http
      .get<Commission>(`${this.apiUrl}/${commissionId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateCommissionStatus(commissionId: number, paidOut: boolean): Observable<Commission> {
    return this.http
      .patch<Commission>(`${this.apiUrl}/${commissionId}/status`, { paidOut }, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getUserDetails(): Observable<User> {
    return this.http
      .get<User>(`${environment.apiUrl}/user/profile`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while processing your request.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized: Please log in again.';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission.';
          break;
        case 404:
          errorMessage = `Not found: ${error.error.message || 'Resource not found'}`;
          break;
        case 500:
          errorMessage = 'Server error: Please try again later.';
          break;
        default:
          errorMessage = `Server returned code ${error.status}: ${error.error.message || error.message}`;
      }
    }
    console.error('Commission service error:', error);
    return throwError(() => new Error(errorMessage));
  }
}