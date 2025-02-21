import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = `http://localhost:8089/examen/trip/createTrip`; // Update with correct URL

  constructor(private http: HttpClient) { }

  createTrip(tripData: any, simpleUserId: number, driverId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${simpleUserId}/${driverId}`, tripData);
  }
}