import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/Core/payment.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  paymentDetails: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    const paymentId = this.route.snapshot.params['paymentId'];
    this.loadPaymentDetails(Number(paymentId));
  }

  loadPaymentDetails(paymentId: number) {
    this.paymentService.getPaymentDetails(paymentId).subscribe({
      next: (data) => {
        this.paymentDetails = {
          amount: data.paymentAmount,
          date: data.paymentDate,
          transactionId: data.stripeChargeId,
          status: 'Completed',
          method: data.paymentMethod,
          tripId: data.trip?.tripId,
          parcelId: data.parcel?.parcelId
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading payment:', err);
        this.loading = false;
      }
    });
  }
}