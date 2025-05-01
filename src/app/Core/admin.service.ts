import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8089/examen/rules'; // Base URL for rules endpoints

  constructor(private http: HttpClient) { }

  // Create rules
  createRules(rulesData: any, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.http.post<any>(url, rulesData, { headers }).pipe(
      tap((data) => console.log("📥 Réponse API - Règles créées:", data)),
      catchError(error => {
        console.error("Erreur lors de la création des règles", error);
        return throwError(() => error);
      })
    );
  }

  // Update rules
  updateRules(rulesData: any, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/update`;
    return this.http.put<any>(url, rulesData, { headers }).pipe(
      tap((data) => console.log("📥 Réponse API - Règles mises à jour:", data)),
      catchError(error => {
        console.error("Erreur lors de la mise à jour des règles", error);
        return throwError(() => error);
      })
    );
  }

    // Get rules
    getRules(headers: HttpHeaders): Observable<any> {
      const url = `${this.apiUrl}`;
      return this.http.get<any>(url, { headers }).pipe(
        tap((data) => console.log("📥 Réponse API - Règles récupérées:", data)),
        catchError(error => {
          console.error("Erreur lors de la récupération des règles", error);
          return throwError(() => error);
        })
      );
    }

    // Fetch subscription statistics (number of users for each subscription type)
  getSubscriptionStats(): Observable<any> {
    const url = `http://localhost:8089/examen/Admin/subscriptionStats`;  // The endpoint to fetch subscription stats
    return this.http.get<any>(url).pipe(
      tap((data) => console.log("📥 Subscription Stats:", data)),
      catchError(error => {
        console.error("Error fetching subscription stats", error);
        return throwError(() => error);
      })
    );
  }
  
}
