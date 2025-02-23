// subscription.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = 'http://localhost:8089/examen/subscription';
  
  constructor(private http: HttpClient) {}

  // Get the token from localStorage or another service (ensure it's set properly)
  getAuthToken(): string {
    return localStorage.getItem('authToken') || '';  // Use the actual token storage mechanism you are using
  }

  // Create subscription
  createSubscription(subscriptionData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.post<any>(`${this.apiUrl}/createSubscription`, subscriptionData, { headers });
  }

  // Get all subscriptions
  getSubscriptions(): Observable<any[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.get<any[]>(`${this.apiUrl}/getAllSubscriptions`, { headers });
  }

  // Delete a subscription
  deleteSubscription(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.delete<any>(`${this.apiUrl}/deleteSubscription/${id}`, { headers });
  }
}
