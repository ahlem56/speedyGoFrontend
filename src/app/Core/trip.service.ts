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
  
   // Get all trips for a specific user
   getTripsForUser(userId: number, headers: HttpHeaders): Observable<any[]> {
    const url = `${this.apiUrl}getTripsForUser/${userId}`;
    return this.http.get<any[]>(url, { headers });
  }

  // Delete a trip by tripId
  deleteTrip(tripId: number, headers: HttpHeaders): Observable<void> {
    const url = `${this.apiUrl}deleteTrip/${tripId}`;
    return this.http.delete<void>(url, { headers });
  }
}