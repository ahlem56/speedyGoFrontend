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
  getParcelsByDriver(driverId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}driver/${driverId}`);
  }
  getParcels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}get-all-parcels`);
  }

}
