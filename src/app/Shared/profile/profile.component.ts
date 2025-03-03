import { CommonModule, DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TripService } from 'src/app/Core/trip.service';
import { UserService } from 'src/app/Core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [DatePipe, CommonModule]
})
export class ProfileComponent implements OnInit {
  user: any = {};  // Store the user data
  trips: any[] = []; // Store the trips for the user
  isTripsVisible: boolean = false; // To control the visibility of the trip history list
  defaultProfilePhoto: string = 'assets/FrontOffice/images/users/user4.jpg';  // Default image path
  profileImageUrl: string = '';  // To store the profile image URL after upload
  userRole: string | null = null; // Store the user role

  constructor(
    private userService: UserService,
    private router: Router,
    private tripService: TripService,
  ) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    this.userRole = localStorage.getItem('userRole'); // Get the user role from localStorage

    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Parse and load user data from localStorage
      this.profileImageUrl = this.getProfileImage();  // Load profile image URL

      // Fetch trips only if the user is not an admin or driver
      if (this.userRole !== 'Admin' && this.userRole !== 'Driver') {
        this.fetchTrips();
      }
    }
  }

  // Return a valid image URL or the default if none exists
  getProfileImage() {
    return this.user.userProfilePhoto
      ? `http://localhost:8089/examen/user/profile-photo/${this.user.userProfilePhoto}` // Backend URL for uploaded image
      : this.defaultProfilePhoto;  // Default photo if no profile photo is set
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
  uploadProfileImage(file: File): void {
    const formData = new FormData();
    formData.append('profilePhoto', file, file.name);
  
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('❌ No auth token found.');
      alert("Unauthorized: Please log in again.");
      return;
    }
  
    // Create HTTP Headers with Authorization
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    console.log("🔹 Sending Headers:", headers);
  
    this.userService.uploadProfileImage(formData, headers).subscribe({
      next: (response) => {
        console.log('✅ Profile photo uploaded successfully:', response);
        this.user.userProfilePhoto = response.fileName;  // ✅ Update in UI
        localStorage.setItem('user', JSON.stringify(this.user));
        this.profileImageUrl = this.getProfileImage();
      },
      error: (error) => {
        console.error('❌ Error uploading profile photo:', error);
        alert("Error: " + (error.error?.message || "Failed to upload profile photo"));
      }
    });
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

  navigateToEditProfile() {
    this.router.navigate(['/edit-profile']); // Naviguer vers la page d'édition de profil
  }
}