import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/Core/payment.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Component({
  standalone: true,
  selector: 'app-payment-creation-front-office',
  templateUrl: './payment-creation.component.html',
  styleUrls: ['./payment-creation.component.css'],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PaymentCreationFrontOfficeComponent implements OnInit {
  stripe: Stripe | null = null;
  payment = {
    amount: 0,
    currency: 'USD',
    paymentMethod: 'credit_card',
    tripId: null,
    parcelId: null
  };

  loading = false;
  paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: '💳' },
    { id: 'stripe', name: 'Stripe', icon: '🔶' }
  ];

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private location: Location
  ) { }

  async ngOnInit() {
    this.stripe = await loadStripe(environment.stripePublishableKey);
    const state = history.state;
    if (state) {
      this.payment.amount = state.amount;
      this.payment.tripId = state.tripId || null;
      this.payment.parcelId = state.parcelId || null;
    }
  }

  processPayment() {
    this.loading = true;
    if (this.payment.paymentMethod === 'stripe' && this.stripe) {
      this.paymentService.processPayment(this.payment).subscribe({
        next: (response) => {
          this.loading = false;
          const redirectPath = this.payment.parcelId ? '/parcels' : '/trips';
          this.router.navigate([redirectPath], {
            state: { message: 'Payment successful!' }
          });
        },
        error: (err) => {
          this.loading = false;
          alert(`Payment failed: ${err.message}`);
        }
      });
    } else {
      this.paymentService.processPayment(this.payment).subscribe({
        next: (response) => {
          this.loading = false;
          const redirectPath = this.payment.parcelId ? '/parcels' : '/trips';
          this.router.navigate([redirectPath], {
            state: { message: 'Payment successful!' }
          });
        },
        error: (err) => {
          this.loading = false;
          alert(`Payment failed: ${err.message}`);
        }
      });
    }
  }

  navigateToTrips() {
    this.router.navigate(['/trips']);
  }

  navigateToParcels() {
    this.router.navigate(['/parcels']);
  }

  navigateToPaymentHistory() {
    this.router.navigate(['/payments/history']);
  }
}