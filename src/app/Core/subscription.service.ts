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

  // Get a subscription by ID
  getSubscriptionById(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.get<any>(`${this.apiUrl}/getSubscription/${id}`, { headers });
  }

  // Update subscription
  updateSubscription(id: number, subscriptionData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.put<any>(`${this.apiUrl}/updateSubscription/${id}`, subscriptionData, { headers });
  }
  // Handle subscription logic when the user subscribes
  subscribe(subscriptionData: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
    return this.http.post<any>(`${this.apiUrl}/subscribeWithDiscount/${subscriptionData.userId}/${subscriptionData.subscriptionId}`, {}, { headers });
  }



    // Get subscription details for a specific user
    getUserSubscription(userId: number): Observable<any> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getAuthToken()}`);
      return this.http.get<any>(`${this.apiUrl}/getSubscriptionForUser/${userId}`, { headers });
    }
}
