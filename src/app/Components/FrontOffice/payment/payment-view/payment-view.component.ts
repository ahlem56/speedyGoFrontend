import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Payment } from 'src/app/Models/payment.model'; // Adjust the import path as necessary
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
       

@Component({
  selector: 'app-payment-view',
  standalone: true, // ✅ REQUIRED for standalone components
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],  // ✅ You can import required modules here
  templateUrl: './payment-view.component.html',
  styleUrls: ['./payment-view.component.css']
})
export class PaymentViewComponent implements OnInit {
  payments: Payment[] = [];
  loading = true;
  error = '';

  newPaymentAmount: number = 0;
  selectedMethod: string = 'STRIPE';
  paymentMethods: string[] = ['CASH', 'STRIPE', 'CREDIT_CARD'];
  stripePaymentMethodId: string = 'pm_test_visa';  // Add this property to fix the error

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPayments();
  }

  fetchPayments(): void {
    this.http.get<Payment[]>('http://localhost:8089/examen/payments')
      .subscribe({
        next: data => {
          this.payments = data;
          this.loading = false;
        },
        error: err => {
          this.error = 'Failed to load payments';
          this.loading = false;
        }
      });
  }

  submitPayment(): void {
    console.log("Method selected:", this.selectedMethod.toUpperCase()); // ✅ Add this line first
  
    const payload = {
      payment: {
        paymentAmount: parseFloat(this.newPaymentAmount.toString()),
        paymentDate: new Date()
      },
      paymentMethod: this.selectedMethod.toUpperCase(), // important it's UPPERCASE
      sourceId: 'tok_visa'
    };
  
    console.log("🚀 Sending test payment payload:", payload);
  
    this.http.post('http://localhost:8089/examen/payments/create', payload).subscribe({
      next: () => {
        alert('✅ Payment successful!');
        this.fetchPayments();
        this.newPaymentAmount = 0;
      },
      error: (err) => {
        console.error('❌ Payment error:', err);
        alert('❌ Failed to process test payment.');
      }
    });
  }
  

  
  
  
  
  

  payNow(payment: Payment): void {
    alert(`Simulating payment for amount ${payment.paymentAmount} $`);
    // Optional logic for real Stripe or redirect here
  }

  downloadReceipt(payment: Payment): void {
    const content = `
      Payment Receipt
      -----------------------
      ID: ${payment.paymentId}
      Amount: $${payment.paymentAmount}
      Date: ${new Date(payment.paymentDate).toLocaleDateString()}
      Method: ${payment.paymentMethod}
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${payment.paymentId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
