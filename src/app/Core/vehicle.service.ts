// vehicle.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, Observable} from 'rxjs';
import {Driver} from "./driver.service";

export interface Vehicle {
  vehiculeId?: number;
  vehicleType: string;
  vehicleModel: string;
  vehicleCapacity: number;
  vehiculeMaintenanceDate: Date;
  vehiculeInsuranceStatus: boolean;
  vehiculeInsuranceDate: Date;
  driver?: Driver;
}


@Injectable({ providedIn: 'root' })
export class VehicleService {
  private baseUrl = 'http://localhost:8089/examen/vehicle';

  constructor(private http: HttpClient) { }

  // CREATE
  createVehicle(vehicleData: any): Observable<Vehicle> {
    // Match Postman's exact payload structure
    const payload = {
      vehicleType: vehicleData.vehicleType,
      vehicleModel: vehicleData.vehicleModel,
      vehicleCapacity: vehicleData.vehicleCapacity,
      vehiculeMaintenanceDate: vehicleData.vehiculeMaintenanceDate.split('T')[0], // Date without time
      vehiculeInsuranceStatus: vehicleData.vehiculeInsuranceStatus,
      vehiculeInsuranceDate: vehicleData.vehiculeInsuranceStatus
        ? vehicleData.vehiculeInsuranceDate.split('T')[0]
        : null
    };

    return this.http.post<Vehicle>(
      `${this.baseUrl}/createVehicle`,
      payload,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // Add other headers from Postman if needed
        })
      }
    );
  }

  // READ
  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/getAllVehicles`);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/getVehicle/${id}`);
  }

  // UPDATE
  updateVehicle(id: number, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.baseUrl}/updateVehicle/${id}`, vehicle);
  }

  // DELETE
  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteVehicle/${id}`);
  }

  // ASSIGN
  assignToDriver(vehicleId: number, driverId: number): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/assignVehicleToDriver/${vehicleId}/${driverId}`,
      {}
    );
  }
}
