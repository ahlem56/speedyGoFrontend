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

  // Get all trips for a specific driver
  getTripsForDriver(driverId: number, headers: HttpHeaders): Observable<any[]> {
    const url = `${this.apiUrl}getTripsForDriver/${driverId}`;
    const token = localStorage.getItem('token');  // Get token from localStorage
  
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Attach token to the headers
    }
  
    return this.http.get<any[]>(url, { headers });
  }

  getAllTrips(headers: HttpHeaders): Observable<any[]> {
    const url = `${this.apiUrl}getAllTrips`;
    return this.http.get<any[]>(url, { headers });
  }

  acceptTrip(tripId: number, headers: HttpHeaders) {
    return this.http.put<any>(`http://localhost:8089/examen/trip/acceptTrip/${tripId}`, {}, { headers });
  }
  
  refuseTrip(tripId: number, headers: HttpHeaders) {
    return this.http.put<any>(`http://localhost:8089/examen/trip/refuseTrip/${tripId}`, {}, { headers });
  }
  
  completeTrip(tripId: number, headers: HttpHeaders) {
    return this.http.put<any>(`http://localhost:8089/examen/trip/completeTrip/${tripId}`, {}, { headers });
  }

  getTripById(tripId: number, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}getTrip/${tripId}`;
    return this.http.get<any>(url, { headers });
  }
  
  
}