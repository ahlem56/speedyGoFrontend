// stripe-payment.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Stripe, StripeCardElement, loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.css'],
  imports: [FormsModule,CommonModule]
})
export class StripePaymentComponent implements OnInit {
  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe: Stripe | null = null;
  card!: StripeCardElement;
  cardError: string = '';
  paymentSuccess = false;
  amount: number = 20; // 💰 static for now, make dynamic later if needed

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51Qx4HqRtzrEMIcCeoHynfwxOuuMqaZcnnOvcTXiXbTYDUpyLlO4Dcs5PcaZ9b1PRAZ7fkOlhMAqVw98niOq3JK0c005qpUhFzy');
  
    if (!this.stripe) {
      console.error('Stripe failed to initialize');
      return;
    }
  
    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
  
    this.card = elements.create('card', { style });
    this.card.mount(this.cardElement.nativeElement);
  
    this.card.on('change', (event) => {
      this.cardError = event.error ? event.error.message! : '';
    });
  }
  

  async payWithCard() {
    const { paymentMethod, error } = await this.stripe!.createPaymentMethod({
      type: 'card',
      card: this.card,
    });
  
    if (error) {
      this.cardError = error.message!;
      console.error('❌ Stripe error:', error);
      return;
    }
  
    console.log('✅ Stripe PaymentMethod created:', paymentMethod);
  
    // Get user from localStorage with better error handling
    let user;
    try {
      const userStr = localStorage.getItem('user');
      console.log('🔍 Raw user data from localStorage:', userStr);
      user = userStr ? JSON.parse(userStr) : null;
      console.log('👤 Parsed user data:', user);
    } catch (e) {
      console.error('❌ Error parsing user data:', e);
      user = null;
    }
  
    const payload = {
      paymentAmount: this.amount,
      paymentDate: new Date(),
      paymentMethod: 'CREDIT_CARD',
      stripePaymentMethodId: paymentMethod.id,
      userId: user?.userId || null,
      tripId: 1  // Adding tripId as per your example
    };
    
    console.log('📦 Sending payment payload:', payload);
    
    this.http.post('http://localhost:8089/examen/payments/process', payload)
      .subscribe({
        next: (response) => {
          console.log('✅ Payment response:', response);
          this.paymentSuccess = true;
          alert('✅ Payment completed!');
        },
        error: (error) => {
          console.error('❌ Payment error:', error);
          alert('❌ Payment failed: ' + (error.error?.message || 'Unknown error'));
        }
      });
  }
}  