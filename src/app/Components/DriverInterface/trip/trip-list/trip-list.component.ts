import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/Core/trip.service';  // Import TripService
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  imports: [DatePipe, CurrencyPipe, CommonModule]
})
export class TripListDriverInterfaceComponent implements OnInit {
  trips: any[] = [];  // Array to hold the trips data

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    // Retrieve the user object from localStorage
    const userStr = localStorage.getItem('user');

    if (!userStr) {
      alert('User not found in localStorage. Please log in again!');
      return;
    }

    const user = JSON.parse(userStr); // Parse the user object from the string
    const driverId = user.userId; // Extract the driver ID

    console.log('Driver ID:', driverId);  // Log the driverId to check if it's correct

    if (!driverId || isNaN(driverId)) {  // Check if it's valid
      alert('Invalid driver ID!');
      return;
    }

    // Set up the headers for the request
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    // Call the service to get trips for the driver
    this.tripService.getTripsForDriver(driverId, headers).subscribe(
      (response) => {
        this.trips = response;  // Assign the response to the trips array
      },
      (error) => {
        console.error('Error fetching trips:', error);
        alert('Failed to load trips!');
      }
    );
  }

  acceptTrip(trip: any): void {
    // Call a service to update the trip status to 'Accepted'
    console.log('Trip Accepted:', trip);
    // Implement actual logic for accepting a trip, such as updating the status and notifying the backend
  }
  
  refuseTrip(trip: any): void {
    // Call a service to update the trip status to 'Refused'
    console.log('Trip Refused:', trip);
    // Implement actual logic for refusing a trip, such as updating the status and notifying the backend
  }
  
}
