import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Import CommonModule

@Component({
  selector: 'app-subscription-creation',
  templateUrl: './subscription-creation.component.html',
  styleUrls: ['./subscription-creation.component.css'],
  standalone: true,
  imports: [CommonModule] // <-- Add CommonModule to the @Component decorator
})
export class SubscriptionCreationFrontOfficeComponent implements OnInit {

  // Sample subscription offers matching the Subscription entity
  subscriptionOffers = [
    { 
      name: 'Monthly Plan', 
      subscriptionType: 'MONTHLY', // Assuming subscriptionType as an enum value
      subscriptionPrice: 45, 
      subscriptionDescription: 'Unlimited carpool offers for one months.' 
    },
    { 
      name: '6-Month Plan', 
      subscriptionType: 'SIX_MONTH', // Assuming subscriptionType as an enum value
      subscriptionPrice: 200, 
      subscriptionDescription: 'Unlimited carpool offers for 6 months.' 
    },
    { 
      name: 'Yearly Plan', 
      subscriptionType: 'YEARLY', // Assuming subscriptionType as an enum value
      subscriptionPrice:400 , 
      subscriptionDescription: 'Unlimited carpool offers for 1 year.' 
    }
  ];

  constructor() { }

  ngOnInit(): void { 
    console.log(this.subscriptionOffers);
  }

  // Formatting price using the Intl API
  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-TN', { style: 'currency', currency: 'TND' }).format(price);
  }

  // Handle subscription logic when the user subscribes
  subscribe(offer: any) {
    console.log(`Subscribed to ${offer.name} for ${this.formatPrice(offer.subscriptionPrice)}`);
  }
}
