import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { loadStripe as loadStripeLib, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripePromise: Promise<Stripe | null> = loadStripe(environment.stripePublishableKey);

  async initializePayment(amount: number): Promise<void> {
    const stripe = await this.stripePromise;
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }
    
    // Get client secret from backend
    const response = await this.http.post<{clientSecret: string} | undefined>(
      '/api/payments/intent', 
      { amount }
    ).toPromise();

    if (!response || !response.clientSecret) {
      throw new Error('Failed to get client secret from backend');
    }

    const { clientSecret } = response;

    // Initialize Stripe Elements
    const elements = stripe.elements({clientSecret});
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
  }

  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) { }

  // Process payment (for front office)
  processPayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    
    return this.http.post(`http://localhost:8089/examen/user/process`, paymentData, { headers });
  }

  // Get user payment history
  getPaymentHistory(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    
    return this.http.get<any[]>(`${this.apiUrl}/history`, { headers });
  }

  // Admin: Get all payments
  getAllPayments(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Create payment record (if needed)
  createPayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });
    
    return this.http.post(this.apiUrl, paymentData, { headers });
  }

  // Update payment status
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

