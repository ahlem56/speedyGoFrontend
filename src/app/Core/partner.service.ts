import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
 

  // Get all partners
  getPartners(): Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiUrl);
  }

  // Get single partner by ID
  getPartnerById(id: number): Observable<Partner> {
    return this.http.get<Partner>(`${this.apiUrl}/${id}`);
  }

  // Update a partner
  updatePartner(partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(
      `${this.apiUrl}/${partner.partnerId}`, // Use parterId instead of id
      partner, 
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    );
  }
  
  deletePartner(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
