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

    constructor(private paymentService: PaymentService) {}
  
    ngOnInit() {
      this.loadPaymentHistory();
    }
  
    private loadPaymentHistory() {
      this.paymentService.getPaymentHistory().subscribe({
        next: (data) => this.payments = data,
        error: (err) => console.error('History load error:', err)
      });
    }
  }
