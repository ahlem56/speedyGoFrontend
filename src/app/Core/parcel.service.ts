import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

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
    return this.http.put(`${this.apiUrl}assign/${parcelId}/${driverId}`, {}, { headers });
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
 // Nombre de livraisons par jour
 getDeliveredParcelsByDay(date: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/countDeliveredParcelsByDay?date=${date}`);
}

// Nombre de livraisons par semaine
getDeliveredParcelsByWeek(date: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/countDeliveredParcelsByWeek?date=${date}`);
}

// Nombre de livraisons par mois
getDeliveredParcelsByMonth(date: string): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/countDeliveredParcelsByMonth?date=${date}`);
}
// Méthode pour marquer un colis comme expédié (SHIPPED)
// Méthode pour marquer un colis comme expédié (SHIPPED)
markParcelAsShipped(parcelId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}${parcelId}/shipped`, {});
}
// Méthode pour marquer un colis comme  (DELIVERED)
markParcelAsDelivered(parcelId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}${parcelId}/delivered`, {});
}
 
getParcelsByStatus(status: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}byStatus?status=${status}`);
}
getRevenueByMonth(): Observable<any> {
  const url = `${this.apiUrl}get-revenue-by-month`;
  return this.http.get<any>(url); // On suppose que l'API renvoie un objet avec les revenus par mois
}

}
