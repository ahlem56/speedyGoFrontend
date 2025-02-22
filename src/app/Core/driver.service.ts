import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Driver interface
export interface Driver {
  userId: number;
  firstName: string;
  lastName: string;
  availabilityD: boolean;  // availability status
}

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = 'http://localhost:8089/examen/driver/'; // URL to the backend API

  constructor(private http: HttpClient) { }

  // Fetch available drivers
  getAvailableDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.baseUrl}get-available-drivers`);  // Updated URL
  }
}
