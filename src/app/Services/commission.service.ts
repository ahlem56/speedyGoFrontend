import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Commission, CommissionSummary } from '../models/commission.model';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {
  private apiUrl = `${environment.apiUrl}/commissions`;

  constructor(private http: HttpClient) { }

  createCommission(partnerId: number, amount: number, description?: string): Observable<Commission> {
    const params: any = {
      partnerId: partnerId.toString(),
      amount: amount.toString()
    };
    if (description) {
      params.description = description;
    }
    return this.http.post<Commission>(`${this.apiUrl}/create`, null, { params });
  }

  getCommissionsByPartner(partnerId: number): Observable<Commission[]> {
    return this.http.get<Commission[]>(`${this.apiUrl}/partner/${partnerId}`);
  }

  getCommissionSummary(partnerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/partner/${partnerId}/summary`);
  }

  getCommissions(): Observable<Commission[]> {
    return this.http.get<Commission[]>(`${this.apiUrl}/partner`);
  }

  getSummary(): Observable<CommissionSummary> {
    return this.http.get<CommissionSummary>(`${this.apiUrl}/partner/summary`);
  }

  getPartnerCommissions(): Observable<Commission[]> {
    return this.http.get<Commission[]>(`${this.apiUrl}/partner/current`);
  }

  getCurrentPartnerCommissionSummary(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/partner/current/summary`);
  }
} 