// commission.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// commission.service.ts
@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private apiUrl = 'http://localhost:8089/examen/commissions';

  constructor(private http: HttpClient) { }

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
}