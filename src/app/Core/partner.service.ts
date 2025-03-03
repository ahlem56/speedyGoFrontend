import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Partner } from '../Models/partner.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(private http: HttpClient) { }

  // Add your service methods here
  getPartnerDetails() {
    // Example method
    return 'Partner details';
  }

  createPartner(partner: Partner): Observable<Partner> {
    return this.http.post<Partner>('API_ENDPOINT_URL', partner);
  }
}
