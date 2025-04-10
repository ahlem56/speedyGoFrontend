import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { topcard, topcards } from './top-cards-data';

@Component({
  selector: 'app-top-cards',
  templateUrl: './top-cards.component.html',
  standalone: false
})
export class TopCardsComponent implements OnInit, OnChanges {

  @Input() totalUsers: number = 0;  // Default value of 0
  @Input() totalTrips: number = 0;  // Default value of 0

  topcards: topcard[];

  constructor() { 
    // Initialize the topcards array
    this.topcards = topcards;
  }

  ngOnInit(): void {
    // Initial update on component load (just in case)
    this.updateTotalUsersCard();
    this.updateTotalTripsCard();

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if 'totalUsers' has changed
    if (changes['totalUsers']) {
      this.updateTotalUsersCard();  // Update the card whenever totalUsers changes
    }

    if (changes['totalTrips']) {
      this.updateTotalTripsCard();  // Update the card when totalTrips changes
    }
  }

  // Helper function to update the 'Total Users' card
  private updateTotalUsersCard(): void {
    const totalUsersCard = this.topcards.find(card => card.title === 'Total Users');
    if (totalUsersCard) {
      totalUsersCard.subtitle = this.totalUsers.toString(); // Update the subtitle with total users
    }
  }

  private updateTotalTripsCard(): void {
    const totalTripsCard = this.topcards.find(card => card.title === 'Total Trips');
    if (totalTripsCard) {
      totalTripsCard.subtitle = this.totalTrips.toString();  // Update the subtitle for Total Trips
    }
  }
}
