import { CommonModule, DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from 'src/app/Core/trip.service';
import { UserService } from 'src/app/Core/user.service';
import { PaymentService } from 'src/app/Core/payment.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports:[DatePipe,CommonModule]
})
export class ProfileComponent implements OnInit {
  user: any = {};  // Store the user data
  trips: any[] = []; // Store the trips for the user
  payments: any[] = []; // Store the payments for the user
  isTripsVisible: boolean = false; // To control the visibility of the trip history list
  isPaymentsVisible: boolean = false; // To control the visibility of the payment history list
  defaultProfilePhoto: string = 'assets/FrontOffice/images/users/default.jpg';  // Default image path
  profileImageUrl: string = '';  // To store the profile image URL after upload

  constructor(private userService: UserService, 
    private router: Router,
    private tripService: TripService,
    private paymentService: PaymentService,) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Parse and load user data from localStorage
      this.profileImageUrl = this.getProfileImage();  // Load profile image URL
      this.fetchTrips();  // Fetch trips for the logged-in user
      this.fetchPayments();  // Fetch payments for the logged-in user
    }
  }

  // Return a valid image URL or the default if none exists
  getProfileImage() {
    return this.user.userProfilePhoto
      ? `assets/FrontOffice/images/users/${this.user.userProfilePhoto}` : this.defaultProfilePhoto;
  }

  // Trigger the hidden file input
  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  // Handle the file change and upload the image
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadProfileImage(file); // Call the actual upload function
    }
  }

  // Actual method to upload the profile image to the server
  uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append('profilePhoto', file, file.name);

    // Get the token from localStorage
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('User is not authenticated.');
      return;
    }

    // Set the Authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Call the backend API to upload the image with Authorization header
    this.userService.uploadProfileImage(formData, headers).subscribe(
      (response) => {
        this.user.userProfilePhoto = response.fileName;
        localStorage.setItem('user', JSON.stringify(this.user));  // Update localStorage with the new user object
        this.profileImageUrl = this.getProfileImage();  // Update the profile image URL
      },
      (error) => {
        console.error('Error uploading profile photo:', error);
      }
    );
  }

  // Fetch the trips for the logged-in user
  fetchTrips() {
    const userId = this.user.userId;
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.tripService.getTripsForUser(userId, headers).subscribe(
      (trips) => {
        this.trips = trips;
      },
      (error) => {
        console.error('Error fetching trips:', error);
      }
    );
  }

  // Fetch the payments for the logged-in user
  fetchPayments() {
    this.paymentService.getPaymentHistory().subscribe({
      next: (payments) => {
        this.payments = payments;
      },
      error: (err) => {
        console.error('Failed to fetch payment history', err);
      }
    });
  }

  // Delete a trip
  deleteTrip(tripId: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.tripService.deleteTrip(tripId, headers).subscribe(
      () => {
        this.trips = this.trips.filter(trip => trip.tripId !== tripId); // Remove the trip from the list
        console.log('Trip deleted successfully');
      },
      (error) => {
        console.error('Error deleting trip:', error);
      }
    );
  }

  toggleTripHistory() {
    this.isTripsVisible = !this.isTripsVisible; // Toggle the trip history visibility
  }

  togglePaymentHistory() {
    this.isPaymentsVisible = !this.isPaymentsVisible; // Toggle the payment history visibility
  }
}
