import { Component } from '@angular/core';
import { PaymentService } from 'src/app/Core/payment.service';

@Component({
    selector: 'app-payment-history',
    templateUrl: './payment-history.component.html',
    styleUrls: ['./payment-history.component.css'],
    standalone: false
})
export class PaymentHistoryFrontOfficeComponent {
  payments: any[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.loadPaymentHistory();
  }

  private loadPaymentHistory() {
    this.paymentService.getPaymentHistory().subscribe({
      next: (data) => {
        this.payments = data.map(payment => ({
          ...payment,
          paymentDate: new Date(payment.paymentDate),
          status: this.getPaymentStatus(payment)
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('History load error:', err);
        this.errorMessage = 'Failed to load payment history';
        this.loading = false;
      }
    });
  }

  private getPaymentStatus(payment: any): string {
    return payment.stripeChargeId ? 'completed' : 'pending';
  }
}
