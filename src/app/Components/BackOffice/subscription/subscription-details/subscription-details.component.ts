import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SubscriptionService } from 'src/app/Core/subscription.service';

@Component({
  selector: 'app-subscription-details',
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.css'],
  imports:[FormsModule,CommonModule]
})
export class SubscriptionDetailsBackOfficeComponent {
  subscriptionType: string = 'PREMIUM';  // Default value
  subscriptionPrice: number = 19.99;
  subscriptionDescription: string = '';
  showExistingSubscriptions: boolean = false;  // Toggle for showing subscriptions
  subscriptions: any[] = [];  // This will hold the existing subscriptions

  constructor(private subscriptionService: SubscriptionService,
    private router: Router // Inject Router to navigate to the edit page
  ) {}

  // Toggle visibility of existing subscriptions
  toggleExistingSubscriptions() {
    this.showExistingSubscriptions = !this.showExistingSubscriptions;
    if (this.showExistingSubscriptions) {
      this.fetchExistingSubscriptions(); // Fetch subscriptions when shown
    }
  }

  // Fetch the list of existing subscriptions
  fetchExistingSubscriptions() {
    this.subscriptionService.getSubscriptions().subscribe(
      (response) => {
        this.subscriptions = response;
      },
      (error) => {
        console.error('Error fetching subscriptions:', error);
        alert('Error fetching subscriptions');
      }
    );
  }

  // Submit a new subscription
  onSubmit() {
    const subscriptionData = {
      subscriptionType: this.subscriptionType,
      subscriptionPrice: this.subscriptionPrice,
      subscriptionDescription: this.subscriptionDescription,
    };

    this.subscriptionService.createSubscription(subscriptionData).subscribe(
      (response) => {
        console.log('Subscription created successfully:', response);
        alert('Subscription created successfully!');
        this.subscriptionDescription = '';  // Clear the form
        this.fetchExistingSubscriptions();  // Refresh the list
      },
      (error) => {
        console.error('Error creating subscription:', error);
        alert('Error creating subscription');
      }
    );
  }

  // Edit a subscription (populate form with selected subscription data)
  // Navigate to the Edit Subscription page
  editSubscription(subscription: any) {
    this.router.navigate([`/back-office/subscription/edit/${subscription.subscriptionId}`]);  // Correct navigation to edit page
  }

  // Delete a subscription
  deleteSubscription(id: number) {
    this.subscriptionService.deleteSubscription(id).subscribe(
      (response) => {
        console.log('Subscription deleted successfully:', response);
        this.fetchExistingSubscriptions(); // Refresh the list
      },
      (error) => {
        console.error('Error deleting subscription:', error);
        alert('Error deleting subscription');
      }
    );
  }
}
