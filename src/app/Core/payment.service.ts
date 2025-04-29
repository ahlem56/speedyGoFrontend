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
  [key: string]: any; // Add this to allow additional properties
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

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const payload: any = {
      paymentAmount: Number(paymentData.amount.toFixed(2)),
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
      withCredentials: true  // Important for CORS with credentials
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

  // Rest of your methods remain the same
  getPaymentDetails(paymentId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${paymentId}`);
  }

  getPaymentHistory(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    
    return this.http.get<any[]>(`${this.apiUrl}/history`, { headers });
  }

  getAllPayments(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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
  

  createPaymentIntent(amount: number): Observable<{ clientSecret: string }> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
  
    return this.http.post<{ clientSecret: string }>(
      `${this.apiUrl}/create-payment-intent`,
      { paymentAmount: amount },
      { headers }
    );
  }
  

  updatePaymentStatus(paymentId: number, status: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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