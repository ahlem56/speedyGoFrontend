import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  private apiUrl = 'http://localhost:8089/examen/parcel/'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  createParcel(parcelData: any, simpleUserId: number, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}createParcel/${simpleUserId}`;
    return this.http.post(url, parcelData, { headers });
  }
  // Get all trips for a specific driver
  getParcelForDriver(driverId: number, headers: HttpHeaders): Observable<any[]> {
    const url = `${this.apiUrl}driver/${driverId}`;
    const token = localStorage.getItem('authToken');  // Get token from localStorage
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Attach token to the headers
    }
  
    return this.http.get<any[]>(url, { headers });
  }
  getParcels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}get-all-parcels`);
  }
  assignParcelToDriver(parcelId: number, driverId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}assign/${parcelId}/${driverId}`, {});
  }

}
