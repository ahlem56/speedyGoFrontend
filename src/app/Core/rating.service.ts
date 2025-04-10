import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8089/examen/ratings';

  constructor(private http: HttpClient) {}

  createRating(rating: any, tripId: number, raterId: number, ratedId: number, headers: HttpHeaders): Observable<any> {
    // Log raterId and validate it
    console.log('raterId:', raterId);
    
    if (!raterId) {
      console.error('Invalid raterId');
      // Return an observable that emits an error if raterId is invalid
      return throwError(() => new Error('Invalid raterId'));
    }

    // If raterId is valid, proceed with the request
    return this.http.post(`${this.apiUrl}/rate/${tripId}/${raterId}/${ratedId}`, rating, { headers }).pipe(
      catchError((error) => {
        console.error('Error occurred while submitting rating:', error);
        return throwError(() => new Error('Error occurred while submitting rating'));
      })
    );
  }

  getUserRatings(userId: number, headers: HttpHeaders): Observable<{ ratingsReceived: any[]; ratingsGiven: any[] }> {
    return this.http.get<{ ratingsReceived: any[]; ratingsGiven: any[] }>(`${this.apiUrl}/user/${userId}`, { headers });
  }
  



  getAverageRating(userId: number, headers: HttpHeaders): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average/${userId}`, { headers });
  }

  canRate(tripId: number, raterId: number, ratedId: number, headers: HttpHeaders): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/can-rate/${tripId}/${raterId}/${ratedId}`, { headers });
  }
}