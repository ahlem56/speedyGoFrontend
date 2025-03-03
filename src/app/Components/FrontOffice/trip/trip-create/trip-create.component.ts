import { AfterViewInit, Component, OnInit, NgZone } from '@angular/core';
import { TripService } from 'src/app/Core/trip.service';
import { DriverService, Driver } from 'src/app/Core/driver.service';
import { UserService } from 'src/app/Core/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
  imports: [FormsModule, CommonModule, GoogleMapsModule]
})
export class TripCreateFrontOfficeComponent implements OnInit, AfterViewInit {
  availableDrivers: Driver[] = [];
  trip: any = {
    tripDeparture: '',
    tripDestination: '',
    tripDate: '',
    tripDuration: null,
    tripPrice: null,
    tripType: '',
    numPeople: 1, // Add this field
    reservationStatus: 'PENDING',
    driverId: null,
  };
  simpleUserId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  mapCenter: google.maps.LatLngLiteral = { lat: 36.8065, lng: 10.1815 };
  mapZoom = 8;
  markerPosition: google.maps.LatLngLiteral = { lat: 36.8065, lng: 10.1815 };
  minDate = new Date().toISOString().split('T')[0];


  constructor(
    private driverService: DriverService,
    private tripService: TripService,
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone // ✅ Properly injected
  ) {}

  ngOnInit() {
    this.driverService.getAvailableDrivers().subscribe(
      (drivers) => {
        this.availableDrivers = drivers;
      },
      (error) => {
        this.errorMessage = 'Error fetching drivers. Please try again later.';
        console.error(error);
      }
    );

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.simpleUserId = currentUser.userId;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.mapCenter = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.markerPosition = this.mapCenter;
          this.getAddressFromLatLng(this.mapCenter, 'departure');
        },
        (error) => {
          console.error("Geolocation error:", error);
          this.errorMessage = "Could not detect your location.";
        }
      );
    }
  }

  // ✅ Move ngAfterViewInit outside ngOnInit
  ngAfterViewInit() {
    this.initAutocomplete();
  }

  // ✅ Move initAutocomplete outside ngOnInit
  initAutocomplete() {
    const destinationInput = document.getElementById('destinationInput') as HTMLInputElement;
    
    if (destinationInput) {
      const autocomplete = new google.maps.places.Autocomplete(destinationInput, {
        types: ['geocode'],
        componentRestrictions: { country: "tn" }
      });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            this.trip.tripDestination = place.formatted_address;
          }
        });
      });
    }
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
      this.getAddressFromLatLng(this.markerPosition, 'destination');
    }
  }

  getAddressFromLatLng(latLng: google.maps.LatLngLiteral, type: 'departure' | 'destination') {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        if (type === 'departure') {
          this.trip.tripDeparture = results[0].formatted_address;
        } else {
          this.trip.tripDestination = results[0].formatted_address;
        }
      } else {
        this.errorMessage = 'Could not retrieve address. Please try again.';
      }
    });
  }

  createTrip() {
    this.errorMessage = ''; // Clear previous error messages
    const currentDate = new Date();
    const selectedDate = new Date(this.trip.tripDate);
  
    if (!this.trip.tripDeparture || !this.trip.tripDestination) {
      this.errorMessage = 'Departure and destination locations are required.';
      return;
    }
  
    if (!this.trip.tripType) {
      this.errorMessage = 'Trip type is required.';
      return;
    }
  
    if (!this.trip.tripDate || selectedDate <= currentDate) {
      this.errorMessage = 'Date of departure must be in the future.';
      return;
    }
  
    if (this.trip.numberOfPassengers < 1 || this.trip.numberOfPassengers > 4) {
      this.errorMessage = 'Number of people must be between 1 and 4.';
      return;
    }
  
    if (!this.trip.driverId) {
      this.errorMessage = 'Please select a driver.';
      return;
    }
  
    if (!this.simpleUserId) {
      this.errorMessage = 'User ID is not available.';
      return;
    }
  
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.tripService.createTrip(this.trip, this.simpleUserId, this.trip.driverId, headers).subscribe(
      (createdTrip) => {
        console.log('Trip Created', createdTrip);
        this.successMessage = 'Your trip has been created successfully!';
        this.errorMessage = '';
  
        // Redirect to "payments/create" after trip creation
        this.router.navigate(['/payments/create']);
  
        // Reset form
        this.trip = {
          tripDeparture: '',
          tripDestination: '',
          tripDate: '',
          tripDuration: null,
          tripPrice: null,
          tripType: '',
          numPeople: 1,
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
