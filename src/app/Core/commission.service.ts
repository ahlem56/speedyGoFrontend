// commission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// commission.service.ts
@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private apiUrl = 'http://localhost:8089/examen/commissions';

  constructor(private http: HttpClient) { }

  createCommission(partnerId: number, amount: number, description?: string): Observable<any> {
    console.log(`Creating commission for partner ${partnerId} with amount ${amount}`);
    
    // Ensure partnerId is a number
    const params: any = {
      partnerId: partnerId,
      amount: amount
    };
    
    if (description) {
      params.description = description;
    }

    return this.http.post<any>(`${this.apiUrl}/create`, null, { params })
      .pipe(
        catchError(this.handleError)
      );
  }

  getCommissions(partnerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/partner/${partnerId}`);
  }

  getSummary(partnerId: number): Observable<{ total: number, pending: number }> {
    return this.http.get<{ total: number, pending: number }>(
      `${this.apiUrl}/partner/${partnerId}/summary`
    );
  }

  getCommissionDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Commission service error:', error);
    let errorMessage = 'An error occurred while processing your request.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code ${error.status}, error: ${error.error}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}