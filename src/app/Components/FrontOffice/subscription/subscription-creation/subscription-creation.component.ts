// subscription-creation.component.ts
import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from 'src/app/Core/subscription.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-creation',
  templateUrl: './subscription-creation.component.html',
  styleUrls: ['./subscription-creation.component.css'],
  imports: [CommonModule],  // No need to import FormsModule or CommonModule here as they are not used in this component
})
export class SubscriptionCreationFrontOfficeComponent implements OnInit {

  subscriptionOffers: any[] = [];
  userId: number | null = null;  // Set this to the current user's ID (from a user service or authentication state)
  userSubscription: any = null;  // Track the current user's subscription
  originalPrice: number = 0;     // Original price of the subscription
  discountedPrice: number = 0;   // Discounted price for the user
  discountMessage: string = '';  // Message to show whether the user received a discount
  constructor(private subscriptionService: SubscriptionService, private router: Router) { }
  userActivityLevel = ''; // Assuming you have a way to get the user's activity level

  ngOnInit(): void {
    this.fetchSubscriptions();  // Fetch subscriptions from the backend
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = currentUser.userId;
    this.userActivityLevel = currentUser.activityLevel;  // Assuming activityLevel is part of the user object

  }

   // Fetch subscriptions from the backend
   fetchSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(
      (response) => {
        this.subscriptionOffers = response.map(offer => {
          // Ensure you map each offer to include the discounted price
          const discountPercentage = this.calculateDiscountPercentage(offer.subscriptionPrice, offer.discountedPrice);
          return {
            ...offer,
            discountedPrice: offer.discountedPrice || offer.subscriptionPrice,
            discountPercentage: discountPercentage
          };
        });
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
        alert('Error fetching subscriptions');
      }
    );
  }

  // Calculate the discount percentage
  calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
    if (originalPrice && discountedPrice < originalPrice) {
      return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }
    return 0; // No discount if there's no price difference
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-TN', { style: 'currency', currency: 'TND' }).format(price);
  }
  // Handle subscription logic when the user subscribes
  subscribe(offer: any) {
    const subscriptionData = {
      userId: this.userId,
      subscriptionId: offer.subscriptionId,
    };
  
    this.subscriptionService.subscribe(subscriptionData).subscribe(
      (response) => {
        console.log(`Successfully subscribed to ${offer.subscriptionType}`);
        alert(`Successfully subscribed to ${offer.subscriptionType}`);
  
        // Extract the original price and discounted price from the response
        this.originalPrice = response.originalPrice;
        this.discountedPrice = response.discountedPrice;
  
        // Show message if the user received a discount
        if (this.discountedPrice < this.originalPrice) {
          this.discountMessage = `You received a discount! Your discounted price is ${this.discountedPrice}`;
        } else {
          this.discountMessage = 'No discount applied.';
        }
  
        this.router.navigate(['/payments/create']);  // Redirect to payment page or confirmation page
      },
      (error) => {
        console.error('Error subscribing to the subscription:', error);
        alert('Error subscribing to the subscription');
      }
    );
  }
  
}
