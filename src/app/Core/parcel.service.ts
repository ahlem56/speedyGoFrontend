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
  assignParcelToDriver(parcelId: number, driverId: number) {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(`${this.apiUrl}parcels/assign/${parcelId}/${driverId}`, {}, { headers });
}

  getParcelsForUser(userId: number, headers: HttpHeaders): Observable<any[]> {
    const url = `${this.apiUrl}user/${userId}`;
    return this.http.get<any[]>(url, { headers });
  }
  deleteParcel(parcelId: number, headers: HttpHeaders): Observable<void> {
    const url = `${this.apiUrl}delete/${parcelId}`;
  return this.http.delete<void>(url, { headers });
  }
  // Filtrer les colis après une certaine date
  getParcelsAfterDate(afterDate: string): Observable<any[]> {
    const url = `${this.apiUrl}after?date=${afterDate}`;
    return this.http.get<any[]>(url);
  }

  // Filtrer les colis avant une certaine date
  getParcelsBeforeDate(beforeDate: string): Observable<any[]> {
    const url = `${this.apiUrl}before?date=${beforeDate}`;
    return this.http.get<any[]>(url);
  }


}
