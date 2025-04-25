import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private apiUrl = 'http://localhost:8089/examen/ratings';  // Your backend API URL
  private sentimentApiUrl = 'http://127.0.0.1:5000/analyze';  // Flask sentiment analysis API URL

  constructor(private http: HttpClient) {}

  // Method to get sentiment from Flask API
  getSentimentAnalysis(review: string): Observable<any> {
    return this.http.post(this.sentimentApiUrl, { review }).pipe(
      catchError((error) => {
        console.error('Error occurred while analyzing sentiment:', error);
        return throwError(() => new Error('Error occurred while analyzing sentiment'));
      })
    );
  }

  // Existing methods to handle ratings
  createRating(rating: any, tripId: number, raterId: number, ratedId: number, headers: HttpHeaders): Observable<any> {
    console.log('raterId:', raterId);
    if (!raterId) {
      console.error('Invalid raterId');
      return throwError(() => new Error('Invalid raterId'));
    }
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
