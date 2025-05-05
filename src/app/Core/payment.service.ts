import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Define the Payment interface
interface Payment {
  id: number;
  paymentAmount: number;
  paymentDate: string;
  paymentMethod?: string;
  [key: string]: any;
}

import { loadStripe as loadStripeLib, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null>;
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(environment.stripePublishableKey);
  }

  processPayment(paymentData: any): Observable<any> {
    if (!paymentData?.amount || isNaN(paymentData.amount)) {
      return throwError(() => new Error('Invalid payment amount'));
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const payload: any = {
      paymentAmount: Number((paymentData.amount / 100).toFixed(2)), // Convert cents to dollars
      currency: 'USD',
      paymentMethod: paymentData.paymentMethod.toUpperCase(),
      tripId: paymentData.tripId || null,
      parcelId: paymentData.parcelId || null,
      userId: user?.userId || null 
    };

    if (paymentData.paymentMethod.toUpperCase() === 'STRIPE') {
      if (!paymentData.stripePaymentMethodId) {
        return throwError(() => new Error('Stripe payment method ID is required'));
      }
      payload.stripePaymentMethodId = paymentData.stripePaymentMethodId;
    }

    return this.http.post(`${this.apiUrl}/process`, payload, { 
      headers,
      withCredentials: true
    }).pipe(
      catchError(error => {
        console.error('Payment error:', error);
        let errorMessage = 'Payment failed. Please check your details.';
        if (error.error && Array.isArray(error.error)) {
          errorMessage = error.error.join('\n');
        }
        return throwError(() => errorMessage);
      })
    );
  }

  getPaymentDetails(paymentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${paymentId}`);
  }

  getPaymentHistory(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.http.get<any[]>(`${this.apiUrl}/history`, { headers });
  }

  getAllPayments(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.http.get<Payment[]>(this.apiUrl, { headers }).pipe(
      map(payments => payments.map(payment => ({
        ...payment,
        paymentDate: new Date(payment.paymentDate),
        paymentMethod: payment.paymentMethod?.toUpperCase() || 'UNKNOWN'
      })))
    );
  }

  createPayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post(`${this.apiUrl}/create`, paymentData, { headers });
  }

  createPaymentIntent(paymentData: any): Observable<{ clientSecret: string }> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    const payload = {
      paymentAmount: Number((paymentData.amount / 100).toFixed(2)), // Convert cents to dollars
      currency: paymentData.currency,
      paymentMethod: paymentData.paymentMethod.toUpperCase(),
      tripId: paymentData.tripId || null,
      parcelId: paymentData.parcelId || null,
      userId: JSON.parse(localStorage.getItem('user') || '{}')?.userId || null
    };

    return this.http.post<{ clientSecret: string }>(
      `${this.apiUrl}/create-intent`,
      payload,
      { headers }
    ).pipe(
      catchError(error => {
        console.error('Payment intent creation error:', error);
        return throwError(() => 'Failed to create payment intent');
      })
    );
  }

  updatePaymentStatus(paymentId: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    
    return this.http.patch(
      `${this.apiUrl}/${paymentId}/status`, 
      { status }, 
      { headers }
    );
  }
}

function loadStripe(stripePublishableKey: string): Promise<Stripe | null> {
  return loadStripeLib(stripePublishableKey);
}