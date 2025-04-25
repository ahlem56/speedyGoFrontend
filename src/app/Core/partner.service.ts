import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../Models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  private apiUrl = 'http://localhost:8089/examen/partners';

  constructor(private http: HttpClient) {}

  // Create a new partner (no Partner model)
  createPartner(partner: any): Observable<any> {  // Use 'any' instead of Partner type
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Partner>('http://localhost:8089/examen/partners/create', partner);
  }

  // Get all partners (no Partner model)
  getPartners(): Observable<any[]> {  // Return 'any[]' instead of 'Partner[]'
    return this.http.get<any[]>(this.apiUrl);
  }

  // Update an existing partner (no Partner model)
  updatePartner(partner: any): Observable<any> {  // Use 'any' instead of Partner type
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/${partner.id}`, partner, { headers });
  }

  // Delete a partner (no Partner model)
  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
