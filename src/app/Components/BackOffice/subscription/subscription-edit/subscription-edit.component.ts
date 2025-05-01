import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionService } from 'src/app/Core/subscription.service';

@Component({
  selector: 'app-subscription-edit',
  templateUrl: './subscription-edit.component.html',
  styleUrls: ['./subscription-edit.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class SubscriptionEditBackOfficeComponent implements OnInit {
  subscriptionId: number | null = null;  // Initialize as null
  subscription: any = {
    subscriptionType: '',
    subscriptionPrice: 0,
    subscriptionDescription: '',
    durationInMonths: 0  // Add durationInMonths
  };

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the subscription ID from the URL
    this.subscriptionId = +this.route.snapshot.paramMap.get('id')!;

    if (this.subscriptionId) {
      this.fetchSubscription(this.subscriptionId); // Fetch subscription if ID is available
    }
  }

  // Fetch the subscription by ID
  fetchSubscription(id: number) {
    this.subscriptionService.getSubscriptionById(id).subscribe(
      (response) => {
        this.subscription = response;
      },
      (error) => {
        console.error('Error fetching subscription:', error);
        alert('Error fetching subscription');
        // Redirect if the subscription is not found
        this.router.navigate(['/back-office/subscriptions']);
      }
    );
  }

  // Submit the updated subscription
  onSubmit() {
    if (this.subscriptionId) {
      // Call the update subscription service method
      this.subscriptionService.updateSubscription(this.subscriptionId, this.subscription).subscribe(
        (response) => {
          console.log('Subscription updated successfully:', response);
          alert('Subscription updated successfully!');
          this.router.navigate(['back-office/subscriptions']); // Navigate back to the subscriptions list
        },
        (error) => {
          console.error('Error updating subscription:', error);
          alert('Error updating subscription');
        }
      );
    }
  }
}
