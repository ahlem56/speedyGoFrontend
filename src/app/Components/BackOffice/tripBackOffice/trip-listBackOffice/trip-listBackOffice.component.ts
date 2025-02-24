import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TripService } from 'src/app/Core/trip.service';

@Component({
    selector: 'app-trip-list',
    templateUrl: './trip-listBackOffice.component.html',
    styleUrls: ['./trip-listBackOffice.component.css'],
    standalone: false
})
export class TripListBackOfficeComponent implements OnInit{

    trips: any[] = [];

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    this.tripService.getAllTrips(headers).subscribe(
      (response) => {
        this.trips = response;
      },
      (error) => {
        console.error('Error fetching trips:', error);
        alert('Failed to load trips!');
      }
    );
  }

  deleteTrip(tripId: number): void {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
    this.tripService.deleteTrip(tripId, headers).subscribe(
      () => {
        alert('Trip deleted successfully!');
        this.loadTrips();  // Reload the trips after deletion
      },
      (error) => {
        console.error('Error deleting trip:', error);
        alert('Failed to delete trip!');
      }
    );
  }

  viewTrip(trip: any): void {
    // You can navigate to a detailed trip view page if needed
    console.log('Viewing trip:', trip);
    this.router.navigate(['/trip-details', trip.id]);
  }
}
