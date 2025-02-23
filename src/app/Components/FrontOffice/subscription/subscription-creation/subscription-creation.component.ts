import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule
import { SubscriptionService } from 'src/app/Core/subscription.service';

@Component({
  selector: 'app-subscription-creation',
  templateUrl: './subscription-creation.component.html',
  styleUrls: ['./subscription-creation.component.css'],
  standalone: true,
  imports: [CommonModule] // <-- Add CommonModule to the @Component decorator
})
export class SubscriptionCreationFrontOfficeComponent implements OnInit {

  subscriptionOffers: any[] = [];  // Store fetched subscriptions from the backend

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.fetchSubscriptions();  // Fetch subscriptions from the backend
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
    console.log(`Subscribed to ${offer.subscriptionType} for ${this.formatPrice(offer.subscriptionPrice)}`);
    alert(`Subscribed to ${offer.subscriptionType} for ${this.formatPrice(offer.subscriptionPrice)}`);
  }
}
