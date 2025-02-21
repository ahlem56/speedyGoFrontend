import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/Core/trip.service'; // Import your trip service
import { DriverService, Driver } from 'src/app/Core/driver.service'; // Import driver service
import { UserService } from 'src/app/Core/user.service'; // Import UserService to fetch the current user
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-create',
  templateUrl: './trip-create.component.html',
  styleUrls: ['./trip-create.component.css'],
  imports: [FormsModule]
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
    reservationStatus: '',
    driverId: null,  // Selected driver ID
  };
  simpleUserId: number | null = null;  // Store the SimpleUser ID

  constructor(
    private driverService: DriverService,
    private tripService: TripService,
    private userService: UserService // Inject UserService to get the logged-in user's ID
  ) {}

  ngOnInit() {
    // Fetch available drivers when the component is initialized
    this.driverService.getAvailableDrivers().subscribe((drivers) => {
      this.availableDrivers = drivers;  // Populate the available drivers list
    });

    // Get the SimpleUser ID from UserService (assuming this method returns it)
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.simpleUserId = currentUser.userId;  // You might need to adjust based on how the user info is stored
  }

  // Call the backend API to create the trip with selected driver
  createTrip() {
    // Ensure driverId is set to the selected driver's ID
    this.trip.driverId = this.trip.driverId || (document.getElementById('driverSelect') as HTMLSelectElement)?.value;

    if (this.simpleUserId) {
      // Call the backend to create the trip
      this.tripService.createTrip(this.trip, this.simpleUserId, this.trip.driverId).subscribe((createdTrip) => {
        console.log('Trip Created', createdTrip);
      });
    } else {
      console.error("User ID is not available.");
    }
  }
}
