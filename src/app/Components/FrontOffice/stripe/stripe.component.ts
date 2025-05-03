import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

interface JwtPayload {
  sub: string; // Email
  role: string; // e.g., "SimpleUser"
  userId?: number;
  partnerId?: number;
  iat: number;
  exp: number;
}

function parseJwt(token: string): JwtPayload {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    throw new Error('Invalid JWT');
  }
}

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css']
})
export class StripeComponent implements OnInit {
  stripe: any;
  card: any;
  isProcessing = false;
  paymentSuccess = false;
  amount = 20;
  cardError: string | null = null;
  currentUser: { userId?: number; partnerId?: number; name?: string } | null = null;

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      this.stripe = await loadStripe(environment.stripePublishableKey);
      if (!this.stripe) {
        throw new Error('Failed to load Stripe');
      }
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
      console.log('✅ Stripe initialized and card element mounted');

      const token = localStorage.getItem('token');
      if (token) {
        const decoded: JwtPayload = parseJwt(token);
        this.currentUser = {
          userId: decoded.userId, // Adjust if not in JWT
          partnerId: decoded.partnerId,
          name: decoded.sub
        };
      }
    } catch (error) {
      console.error('❌ Error initializing Stripe:', error);
      this.cardError = 'Failed to initialize payment system';
    }
  }

  async payWithCard() {
    this.isProcessing = true;
    this.cardError = null;
    this.paymentSuccess = false;

    if (!this.currentUser || !this.currentUser.userId) {
      this.isProcessing = false;
      this.cardError = 'User not logged in';
      alert('❌ Please log in to make a payment');
      return;
    }

    const paymentRequest = {
      paymentAmount: this.amount,
      paymentMethod: 'STRIPE',
      userId: this.currentUser.userId,
      tripId: 1,
      partnerId: this.currentUser.partnerId || null
    };

    console.log('🌟 Creating new PaymentIntent:', paymentRequest);

    try {
      const intentResponse = await this.http
        .post<{ clientSecret: string }>(
          `${environment.apiUrl}/payments/create-intent`,
          paymentRequest,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
        .toPromise();

      if (!intentResponse || !intentResponse.clientSecret) {
        throw new Error('Failed to create PaymentIntent: No client_secret returned');
      }

      console.log('✅ PaymentIntent created with client_secret:', intentResponse.clientSecret);

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(intentResponse.clientSecret, {
        payment_method: {
          card: this.card,
          billing_details: {
            name: this.currentUser.name || 'Test User'
          }
        }
      });

      if (error) {
        this.isProcessing = false;
        this.cardError = error.message || 'Payment failed';
        console.error('❌ Stripe confirmation error:', error);
        alert(`❌ Payment failed: ${this.cardError}\n\nUse test card: 4242 4242 4242 4242`);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        console.log('✅ PaymentIntent confirmed:', paymentIntent.id);

        const processRequest = {
          ...paymentRequest,
          stripePaymentMethodId: paymentIntent.id
        };

        this.http
          .post(`${environment.apiUrl}/payments/process`, processRequest, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            observe: 'response'
          })
          .subscribe({
            next: (response) => {
              this.isProcessing = false;
              console.log('🌟 Full HTTP Response:', JSON.stringify(response, null, 2));
              if (response.status === 201 || response.status === 200) {
                this.paymentSuccess = true;
                console.log('✅ Payment response body:', JSON.stringify(response.body, null, 2));
                alert('✅ Payment completed successfully!');
              } else {
                this.cardError = 'Unexpected response status';
                console.error('❌ Unexpected response status:', response.status, 'Body:', response.body);
                alert(`❌ Payment failed: Unexpected status ${response.status}`);
              }
            },
            error: (error: HttpErrorResponse) => {
              this.isProcessing = false;
              this.cardError = error.error?.error || error.message || 'Payment failed';
              console.error('❌ Payment process error:', error);
              alert(`❌ ${this.cardError}\n\nUse test card: 4242 4242 4242 4242`);
            }
          });
      } else {
        this.isProcessing = false;
        this.cardError = 'PaymentIntent not succeeded';
        console.error('❌ PaymentIntent status:', paymentIntent.status);
        alert('❌ Payment failed: PaymentIntent not succeeded');
      }
    } catch (error: any) {
      this.isProcessing = false;
      this.cardError = error.message || 'Failed to create PaymentIntent';
      console.error('❌ Error in payment flow:', error);
      alert(`❌ ${this.cardError}\n\nUse test card: 4242 4242 4242 4242`);
    }
  }
}