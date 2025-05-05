import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from 'src/app/Core/trip.service';
import { ParcelService } from 'src/app/Core/parcel.service';
import { Trip } from 'src/app/Models/trip.model';
import { Parcel } from 'src/app/Models/parcel.model';
import { HttpHeaders } from '@angular/common/http';

interface JwtPayload {
  sub: string;
  role: string;
  userId?: number;
  iat: number;
  exp: number;
}

interface UserProfile {
  userId: number;
  email: string;
  partner?: { partnerId: number; partnerName: string };
}

interface StoredUser {
  userId: number;
  email: string;
  partner?: { partnerId: number; partnerName: string };
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
  styleUrls: ['./stripe.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class StripeComponent implements OnInit {
  stripe: any;
  card: any;
  isProcessing = false;
  paymentSuccess = false;
  amount = 0;
  cardError: string | null = null;
  currentUser: { userId?: number; partnerId?: number; name?: string } | null = null;
  tripId: number | null = null;
  parcelId: number | null = null;
  isDataLoaded = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private parcelService: ParcelService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    try {
      console.log('StripeComponent URL on init:', window.location.href);
      console.log('Router URL on init:', this.router.url);

      // Load Stripe once
      this.stripe = await loadStripe(environment.stripePublishableKey);
      if (!this.stripe) {
        throw new Error('Failed to load Stripe');
      }
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
      console.log('✅ Stripe initialized and card element mounted');

      // Initialize currentUser first
      const token = localStorage.getItem('token');
      console.log('🔍 JWT Token:', token);
      if (token) {
        const decoded: JwtPayload = parseJwt(token);
        this.currentUser = { userId: decoded.userId, name: decoded.sub };
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user: StoredUser = JSON.parse(storedUser);
          this.currentUser.partnerId = user.partner?.partnerId;
          console.log('🔍 Set currentUser.partnerId from localStorage:', this.currentUser.partnerId);
        }
      } else {
        console.error('❌ No token found in localStorage');
        this.cardError = 'Please log in to proceed';
        this.isDataLoaded = true;
        this.cdr.detectChanges();
        return;
      }

      // Now that currentUser is set, handle query params and load payment data
      this.route.queryParams.subscribe(params => {
        this.tripId = +params['tripId'] || null;
        this.parcelId = +params['parcelId'] || null;
        console.log('Extracted tripId (query params):', this.tripId);
        console.log('Extracted parcelId (query params):', this.parcelId);

        if (this.tripId || this.parcelId) {
          console.log('Current user before loadPaymentData:', this.currentUser);
          this.loadPaymentData();
        } else {
          console.warn('No tripId or parcelId available from query params');
          this.isDataLoaded = true;
          this.cdr.detectChanges();
        }
      });
    } catch (error) {
      console.error('❌ Error initializing Stripe:', error);
      this.cardError = 'Failed to initialize payment system';
      this.isDataLoaded = true;
      this.cdr.detectChanges();
    }
  }

  private loadPaymentData() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    console.log('loadPaymentData - tripId:', this.tripId, 'userId:', this.currentUser?.userId);
    if (this.tripId && this.currentUser?.userId) {
      this.tripService.getTripById(this.tripId, headers).subscribe({
        next: (trip: Trip) => {
          console.log('Fetched trip (full response):', trip);
          console.log('Raw tripPrice:', trip.tripPrice);
          this.amount = this.parsePrice(trip.tripPrice);
          console.log('Parsed amount after parsePrice:', this.amount);
          if (this.amount === 0) {
            console.warn('Amount is 0, setting hardcoded value for testing');
            this.amount = 500;
          }
          this.isDataLoaded = true;
          this.cdr.detectChanges();
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error fetching trip:', err.status, err.error);
          this.amount = 0;
          this.isDataLoaded = true;
          this.cdr.detectChanges();
        }
      });
    } else if (this.parcelId && this.currentUser?.userId) {
      this.parcelService.getParcel(this.parcelId).subscribe({
        next: (parcel: Parcel) => {
          console.log('Fetched parcel (full response):', parcel);
          console.log('Raw parcelPrice:', parcel.parcelPrice);
          this.amount = this.parsePrice(parcel.parcelPrice);
          console.log('Parsed amount after parsePrice:', this.amount);
          if (this.amount === 0) {
            console.warn('Amount is 0, setting hardcoded value for testing');
            this.amount = 500;
          }
          this.isDataLoaded = true;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.error('Error fetching parcel:', err);
          this.amount = 0;
          this.isDataLoaded = true;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.isDataLoaded = true;
      console.warn('No tripId or parcelId provided, or userId missing');
      this.cdr.detectChanges();
    }
  }

  private parsePrice(price: string | number | undefined): number {
    let amount = 0;
    if (!price) {
      console.warn('Price is undefined or null:', price);
      return amount;
    }

    try {
      const parsed = typeof price === 'string' ? parseFloat(price) : price;
      console.log('Parsed value:', parsed);
      if (!isNaN(parsed)) {
        amount = Math.round(parsed * 100);
        console.log(`Parsed price ${price} to amount: ${amount}`);
      } else {
        console.warn(`Failed to parse price ${price} to a valid number`);
      }
    } catch (error) {
      console.error('Error parsing price:', error, 'Price:', price);
    }

    return amount;
  }

  async payWithCard() {
    if (!this.isDataLoaded) {
      alert('Please wait for payment details to load.');
      return;
    }

    this.isProcessing = true;
    this.cardError = null;
    this.paymentSuccess = false;

    if (!this.currentUser || !this.currentUser.userId) {
      this.isProcessing = false;
      this.cardError = 'User not logged in';
      alert('❌ Please log in to make a payment');
      return;
    }

    if (this.amount <= 0) {
      this.isProcessing = false;
      this.cardError = 'Invalid payment amount';
      alert('❌ No valid amount for payment');
      return;
    }

    console.log('🔍 Current User:', this.currentUser);

    const paymentRequest = {
      paymentAmount: (this.amount / 100).toString(),
      paymentMethod: 'STRIPE',
      userId: this.currentUser.userId,
      tripId: this.tripId || null,
      parcelId: this.parcelId || null,
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
            name: this.currentUser.name ?? 'Test User'
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
          paymentAmount: (this.amount / 100).toString(),
          paymentMethod: 'STRIPE',
          userId: this.currentUser.userId,
          tripId: this.tripId || null,
          parcelId: this.parcelId || null,
          partnerId: this.currentUser.partnerId || null,
          stripePaymentMethodId: paymentIntent.id
        };

        console.log('🔍 Sending processRequest:', processRequest);

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
                if (this.currentUser?.partnerId) {
                  this.http
                    .get(`${environment.apiUrl}/commissions/partner/${this.currentUser.partnerId}/summary`, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    })
                    .subscribe({
                      next: (summary: any) => {
                        console.log(`💰 Commission Summary for Partner ID ${this.currentUser?.partnerId ?? 'unknown'}:`, summary);
                        alert(`Commission Pending: ${summary.pending || 0}`);
                      },
                      error: (error: HttpErrorResponse) => {
                        console.error('❌ Error fetching commission summary:', error);
                      }
                    });
                }
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