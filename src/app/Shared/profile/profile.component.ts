import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelService } from 'src/app/Core/parcel.service';
import { TripService } from 'src/app/Core/trip.service';
import { UserService } from 'src/app/Core/user.service';
import { PaymentService } from 'src/app/Core/payment.service';
import { CarpoolService } from 'src/app/Core/carpool.service';
import { RatingService } from 'src/app/Core/rating.service';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { DriverService } from 'src/app/Core/driver.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [DatePipe, CommonModule,FormsModule]
})
export class ProfileComponent implements OnInit {
  // User Data
  user: any = {};
  userRole: string | null = null;
  
  // Profile Image
  defaultProfilePhoto = 'assets/FrontOffice/images/users/user4.jpg';
  profileImageUrl = '';
  
  isRatingModalOpen = false;
  currentRating = 0;  // Store the selected rating
  ratingComment = ''; // Store the comment
  tripToRate: any = {};  // Add this line to define the tripToRate property

  // Trip Data
  trips: any[] = [];
  isTripsVisible = false;
  
  // Parcel Data
  parcels: any[] = [];
  isParcelsVisible = false;
  
  // Payment Data
  payments: any[] = [];
  isPaymentsVisible = false;
  
  // Carpool Data
  carpoolOffers: any[] = [];
  isCarpoolVisible = false;
  
  // Rating Data
  ratingsReceived: any[] = [];
  ratingsGiven: any[] = [];
  averageRating = 0;
  isRatingsVisible = false;

  isAvailable: boolean = false; // Default to not available


  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
    private tripService: TripService,
    private parcelService: ParcelService,
    private paymentService: PaymentService,
    private carpoolService: CarpoolService,
    private ratingService: RatingService,
    private driverService: DriverService, // Assuming you have a driver service

  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadProfileData();
    this.checkAvailability(); // Check availability when the component is initialized
  
  }

  private loadUserData(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userRole = localStorage.getItem('userRole');
      this.profileImageUrl = this.getProfileImage();
    }
  }

  private loadProfileData(): void {
    if (this.userRole !== 'Admin' && this.userRole !== 'Driver') {
      this.fetchTrips();
      this.fetchParcels();
      this.fetchPayments();
      this.fetchCarpoolHistory();
    }
    if (this.userRole !== 'Admin') {
      this.loadRatings();
    }
  }

  // Profile Image Methods
  getProfileImage(): string {
    return this.user.userProfilePhoto
      ? `http://localhost:8089/examen/user/profile-photo/${this.user.userProfilePhoto}`
      : this.defaultProfilePhoto;
  }

  triggerFileInput(): void {
    document.getElementById('fileInput')?.click();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) this.uploadProfileImage(file);
  }

  uploadProfileImage(file: File): void {
    const formData = new FormData();
    formData.append('profilePhoto', file, file.name);
    
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error('❌ No auth token found');
      alert("Unauthorized: Please log in again.");
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.userService.uploadProfileImage(formData, headers).subscribe({
      next: (response) => {
        this.user.userProfilePhoto = response.fileName;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.profileImageUrl = this.getProfileImage();
      },
      error: (error) => {
        console.error('❌ Error uploading profile photo:', error);
        alert("Error: " + (error.error?.message || "Failed to upload profile photo"));
      }
    });
  }

  // Data Fetching Methods
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  fetchTrips(): void {
    const headers = this.getAuthHeaders();
    this.tripService.getTripsForUser(this.user.userId, headers).subscribe({
      next: (trips) => this.trips = trips,
      error: (error) => console.error('Error fetching trips:', error)
    });
  }

  fetchParcels(): void {
    const headers = this.getAuthHeaders();
    this.parcelService.getParcelsForUser(this.user.userId, headers).subscribe({
      next: (parcels) => this.parcels = parcels,
      error: (error) => console.error('Error fetching parcels:', error)
    });
  }

  fetchPayments(): void {
    this.paymentService.getPaymentHistory().subscribe({
      next: (payments) => this.payments = payments,
      error: (err) => console.error('Failed to fetch payment history', err)
    });
  }

  fetchCarpoolHistory(): void {
    const headers = this.getAuthHeaders();
    this.carpoolService.getCarpoolsJoinedByUser(this.user.userId, headers).subscribe({
      next: (joinedCarpools) => this.carpoolOffers = joinedCarpools,
      error: (error) => console.error('Error fetching carpools:', error)
    });
  }

  loadRatings(): void {
    const headers = this.getAuthHeaders();
    const userId = this.user.userId;
  
    this.ratingService.getUserRatings(userId, headers).subscribe({
      next: (ratingsData) => {
        this.ratingsReceived = ratingsData.ratingsReceived || [];
        this.ratingsGiven = ratingsData.ratingsGiven || [];
        this.calculateAverageRating();
      },
      error: (error) => console.error('Error fetching ratings:', error)
    });
  }
  
  // Utility Methods
  calculateAverageRating(): void {
    if (this.ratingsReceived.length > 0) {
      this.averageRating = this.ratingsReceived.reduce((acc, rating) => acc + rating.score, 0) / this.ratingsReceived.length;
    }
  }

  isCarpoolInPast(carpoolDate: string, carpoolTime: string): boolean {
    const now = new Date();
    const carpoolDateTime = new Date(`${carpoolDate}T${carpoolTime}`);
    return carpoolDateTime < now;
  }

  // Action Methods
  deleteTrip(tripId: number): void {
    const headers = this.getAuthHeaders();
    this.tripService.deleteTrip(tripId, headers).subscribe({
      next: () => this.trips = this.trips.filter(trip => trip.tripId !== tripId),
      error: (error) => console.error('Error deleting trip:', error)
    });
  }

 

  cancelCarpool(carpoolId: number): void {
    const headers = this.getAuthHeaders();
    this.carpoolService.leaveCarpool(carpoolId, this.user.userId, headers).subscribe({
      next: () => this.carpoolOffers = this.carpoolOffers.filter(offer => offer.carpoolId !== carpoolId),
      error: (error) => console.error('Error canceling carpool:', error)
    });
  }

  // Toggle Methods
  toggleTripHistory(): void {
    this.isTripsVisible = !this.isTripsVisible;
  }

  toggleParcelHistory(): void {
    this.isParcelsVisible = !this.isParcelsVisible;
  }

  togglePaymentHistory(): void {
    this.isPaymentsVisible = !this.isPaymentsVisible;
  }

  toggleCarpoolHistory(): void {
    this.isCarpoolVisible = !this.isCarpoolVisible;
  }

  toggleRatingHistory(): void {
    this.isRatingsVisible = !this.isRatingsVisible;
  }

  // Navigation
  navigateToEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }


   // This method is called when the user clicks on "Rate This Trip"
 // This method is called when the user clicks on "Rate This Trip"
openRatingModal(trip: any): void {
  this.isRatingModalOpen = true;
  this.tripToRate = trip;  // Store the trip that the user is rating
  
  console.log('Before opening modal, isRated:', this.tripToRate.isRated);

  // Ensure `isRated` is initialized before using it
  if (typeof this.tripToRate.isRated === 'undefined') {
    this.tripToRate.isRated = false;  // Initialize if undefined
  }

  // Reset rating state to prepare for new rating
  this.currentRating = 0;
  this.ratingComment = '';  // Reset comment if any
}

// Close the rating modal
closeRatingModal(): void {
  this.isRatingModalOpen = false;
  this.currentRating = 0;  // Reset rating
  this.ratingComment = '';  // Reset comment
}

// Set the rating value when a star is clicked
setRating(rating: number): void {
  this.currentRating = rating;
}

// Submit the rating
submitRating(): void {
  if (this.currentRating === 0) {
    alert('Please provide a rating!');
    return;
  }

  const ratingData = {
    score: this.currentRating,
    comment: this.ratingComment,
    sentiment: '',        // Initialize sentiment property
    sentimentScore: 0,    // Initialize sentimentScore property
    trip: { tripId: this.tripToRate.tripId },
    rater: { userId: this.user.userId },
    rated: { userId: this.tripToRate.driver.userId }
  };

  // Call the sentiment analysis API to analyze the comment
  this.ratingService.getSentimentAnalysis(this.ratingComment).subscribe({
    next: (sentimentResponse) => {
      ratingData.sentiment = sentimentResponse.sentiment;
      ratingData.sentimentScore = sentimentResponse.score;

      // Submit the rating to the backend with sentiment analysis data
      this.ratingService.createRating(ratingData, this.tripToRate.tripId, this.user.userId, this.tripToRate.driver.userId, this.getAuthHeaders()).subscribe({
        next: (response) => {
          console.log('Rating submitted successfully:', response);

          // Mark the trip as rated and refresh the trip data
          this.tripToRate.isRated = true; // Update the trip's isRated flag locally
          this.refreshTripData(this.tripToRate.tripId);  // Refresh the trip data from the backend

          this.closeRatingModal();
        },
        error: (error) => {
          console.error('Error submitting rating:', error);
        }
      });
    },
    error: (error) => {
      console.error('Error occurred while analyzing sentiment:', error);
    }
  });
}

// In your component where the rating logic is handled

// Fetch the updated trip after submitting the rating
refreshTripData(tripId: number): void {
  const headers = this.getAuthHeaders();  // Make sure you are sending the correct headers (including auth token)
  this.tripService.getTripById(tripId, headers).subscribe(
    (updatedTrip) => {
      // Update the trip object in your component
      this.tripToRate = updatedTrip;  // Assuming `tripToRate` is the selected trip to be rated
    },
    (error) => {
      console.error('Error fetching trip data:', error);
    }
  );
}



// Check if the user can rate this trip
canRate(trip: any): boolean {
  return trip && trip.reservationStatus === 'COMPLETED' && !this.isTripRated(trip);
}


// Check if the trip is already rated
isTripRated(trip: any): boolean {
  return trip.isRated;  // Trip is rated if isRated is true
}




  

  // Method to toggle availability
  toggleAvailability(): void {
    this.isAvailable = !this.isAvailable;
    const updatedDriver = {
      ...this.user,
      availabilityD: this.isAvailable  // Update availability based on the toggle
    };

    // Call the backend to update the driver's availability
    this.driverService.updateDriver(this.user.userId, updatedDriver).subscribe({
      next: (response) => {
        console.log('Driver availability updated successfully:', response);
        this.user.availabilityD = this.isAvailable;  // Update the user object with new availability
        localStorage.setItem('user', JSON.stringify(this.user));  // Store the updated user object in localStorage
      },
      error: (error) => {
        console.error('Error updating driver availability:', error);
        alert('Error updating availability!');
      }
    });
  }

  // Existing methods like loadUserData(), fetchTrips(), etc.

  checkAvailability() {
    if (this.userRole === 'Driver') {
      this.isAvailable = this.user.availabilityD || false;
      }}  // If available, set true
    
  deleteParcel(parcelId: number) {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.parcelService.deleteParcel(parcelId, headers).subscribe(
      () => {
        this.parcels = this.parcels.filter(parcel => parcel.parcelId !== parcelId); // Supprimer le colis de la liste
        console.log('Parcel deleted successfully');
      },
      (error) => {
        console.error('Error deleting parcel:', error);
      }
    );
  }

 
  


  
 



   // SOS Function
   triggerSOS(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          // Prepare the trip data to send
          const tripData = {
            tripId: 0,  // You can set this to 0 if you don't have a tripId at the moment
            tripDeparture: "Unknown",  // Customize based on your use case
            tripDestination: "Unknown",  // Customize as needed
            tripDate: new Date().toISOString(),  // Use the current date and time
            latitude: latitude,
            longitude: longitude,
            simpleUser: {
              userId: this.user?.userId || 0,  // Ensure this is populated
              firstName: this.user?.firstName || "Unknown",
              lastName: this.user?.lastName || "Unknown",
              email: this.user?.email || "Unknown",
              emergencyContactEmail: this.user?.emergencyContactEmail || "Unknown"
            }
          };
  
          console.log("Emergency Contact Email:", this.user?.emergencyContactEmail);

          
          // Send SOS data to backend to trigger email alert
          this.sendSOSAlert(tripData);
        },
        (error) => {
          console.error('Error getting geolocation', error);
          alert("Unable to retrieve your location. Please ensure that location services are enabled.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }
  
  // Sending SOS alert to the backend
  sendSOSAlert(sosData: any): void {
    this.http.post('http://localhost:8089/examen/emergency/send-sos-email', sosData)
      .subscribe(
        response => {
          console.log('SOS alert sent successfully', response);
          alert("SOS alert sent to your emergency contacts.");
        },
        error => {
          console.error('Error sending SOS alert', error);
          alert("There was an error sending the SOS alert. Please try again later.");
        }
      );
  }
  

  
}