import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/Core/trip.service'; // Import your trip service
import { DriverService, Driver } from 'src/app/Core/driver.service'; // Import driver service
import { UserService } from 'src/app/Core/user.service'; // Import UserService to fetch the current user
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
  imports: [FormsModule, CommonModule]
})
export class TripCreateFrontOfficeComponent implements OnInit {
  availableDrivers: Driver[] = [];  // To store the available drivers
  trip: any = {  // Form data for the trip
    tripDeparture: '',
    tripDestination: '',
    tripDate: '',
    tripDuration: null,
    tripPrice: null,
    tripType: '',
    reservationStatus: 'PENDING',
    driverId: null,  // Selected driver ID
  };
  simpleUserId: number | null = null;  // Store the SimpleUser ID
  errorMessage: string = '';  // To store error messages
  successMessage: string = '';  // To store success message
  constructor(
    private driverService: DriverService,
    private tripService: TripService,
    private userService: UserService, // Inject UserService to get the logged-in user's ID
    private router: Router // Inject Router to navigate after success
  ) {}

  ngOnInit() {
    // Fetch available drivers when the component is initialized
    this.driverService.getAvailableDrivers().subscribe(
      (drivers) => {
        console.log('Available drivers:', drivers);  // Check this log to verify available drivers
        this.availableDrivers = drivers;
      },
      (error) => {
        this.errorMessage = 'Error fetching drivers. Please try again later.';
        console.error(error);
      }
    );
  
    // Assign SimpleUser ID from the logged-in user stored in localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.simpleUserId = currentUser.userId;  // You should already have the user info in localStorage
    console.log("SimpleUser ID: ", this.simpleUserId);  // Verify the SimpleUser ID
  }
  
  
  // Call the backend API to create the trip with selected driver
  createTrip() {
    console.log('Selected Driver ID:', this.trip.driverId);
    console.log('SimpleUser ID:', this.simpleUserId);
  
    if (!this.trip.driverId) {
      this.errorMessage = 'Please select a driver';
      return;
    }
  
    // Ensure SimpleUser ID is set
    if (!this.simpleUserId) {
      this.errorMessage = 'User ID is not available.';
      return;
    }
  
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.tripService.createTrip(this.trip, this.simpleUserId, this.trip.driverId, headers).subscribe(
      (createdTrip) => {
        console.log('Trip Created', createdTrip);
        // Set success message
        this.successMessage = 'Your trip has been created successfully!';
        console.log('Success message triggered:', this.successMessage);  // Add this line to debug
        this.errorMessage = '';  // Clear any previous error message
        // Optionally, clear the form after successful creation
        this.trip = {
          tripDeparture: '',
          tripDestination: '',
          tripDate: '',
          tripDuration: null,
          tripPrice: null,
          tripType: '',
          reservationStatus: 'PENDING',
          driverId: null,
        };
      },
      (error) => {
        this.errorMessage = 'Failed to create trip. Please try again later.';
        console.error(error);
      }
    );
  }
  
  
  
}
