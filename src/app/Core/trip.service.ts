import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = `http://localhost:8089/examen/trip/`; // Update with correct URL

  constructor(private http: HttpClient) { }

  createTrip(tripData: any, simpleUserId: number, driverId: number, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}createTrip/${simpleUserId}/${driverId}`;
    return this.http.post(url, tripData, { headers });
  }
  
  
}