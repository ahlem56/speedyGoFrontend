// subscription-creation.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionService } from 'src/app/Core/subscription.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-creation',
  templateUrl: './subscription-creation.component.html',
  styleUrls: ['./subscription-creation.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SubscriptionCreationFrontOfficeComponent implements OnInit {

  subscriptionOffers: any[] = [];
  userId: number | null = null;  // Set this to the current user's ID (from a user service or authentication state)

  constructor(private subscriptionService: SubscriptionService, private router: Router) { }

  ngOnInit(): void {
    this.fetchSubscriptions();  // Fetch subscriptions from the backend
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = currentUser.userId;
  }

  // Fetch subscriptions from backend
  fetchSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(
      (response) => {
        this.subscriptionOffers = response;
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
        alert('Error fetching subscriptions');
      }
    );
  }

  // Formatting price using the Intl API
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-TN', { style: 'currency', currency: 'TND' }).format(price);
  }

  // Handle subscription logic when the user subscribes
  subscribe(offer: any) {
    console.log(offer)
    const subscriptionData = {
      
      userId: this.userId,
      subscriptionId: offer.subscriptionId,  // Assuming the subscription ID is available in the offer object
    };

    this.subscriptionService.subscribe(subscriptionData).subscribe(
      (response) => {
        console.log(`Successfully subscribed to ${offer.subscriptionType}`);
        alert(`Successfully subscribed to ${offer.subscriptionType}`);
        this.router.navigate(['/payments/create']);  // Redirect to payment page or confirmation page
      },
      (error) => {
        console.error('Error subscribing to the subscription:', error);
        alert('Error subscribing to the subscription');
      }
    );
  }
}
