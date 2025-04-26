import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { ParcelService } from 'src/app/Core/parcel.service';
import { RatingService } from 'src/app/Core/rating.service';
import { Vehicle, VehicleService } from 'src/app/Core/vehicle.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalTrips: number = 0;
  trips: any[] = [];
  center: google.maps.LatLngLiteral = { lat: 33.8869, lng: 9.5375 };
  zoom: number = 7;
  mapOptions: google.maps.MapOptions = {
    styles: [
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "poi",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "transit",
        "stylers": [{"visibility": "off"}]
      }
    ]
  };
  maxTrips: number = 1; // Will be calculated based on actual data
  topRatedDrivers: any[] = [];
  vehiclesWithExpiredInsurance: Vehicle[] = [];
  totalDeliveredToday: number = 0;
  totalDeliveredThisWeek: number = 0;
  totalDeliveredThisMonth: number = 0;

  constructor(
    private http: HttpClient,
    private parcelService: ParcelService, 
    private ratingService: RatingService, 
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.getTotalUsers();
    this.getTotalTrips();
    this.getTripsByLocation();
    this.getStatistics();
    this.getTopRatedDrivers();
    this.getVehiclesWithExpiredInsurance();
  }

  getTotalUsers(): void {
    this.http.get<number>('http://localhost:8089/examen/Admin/total-users')
      .subscribe({
        next: (data) => this.totalUsers = data,
        error: (err) => console.error('Error fetching total users', err)
      });
  }

  getTotalTrips(): void {
    this.http.get<number>('http://localhost:8089/examen/Admin/total-trips')
      .subscribe({
        next: (data) => this.totalTrips = data,
        error: (err) => console.error('Error fetching total trips', err)
      });
  }

  getTripsByLocation(): void {
    this.http.get<any[]>('http://localhost:8089/examen/Admin/trips-by-location')
      .subscribe({
        next: (data) => {
          this.trips = data;
          this.maxTrips = Math.max(...this.trips.map(trip => trip.tripCount), 1);
          console.log('Trips data:', this.trips);
        },
        error: (err) => console.error('Error fetching trips by location', err)
      });
  }

  getMarkerIcon(trip: any): google.maps.Icon {
    let icon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new google.maps.Size(30, 30),
    };

    if (trip.tripCount > 50) {
      icon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      };
    } else if (trip.tripCount > 20) {
      icon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(35, 35),
      };
    }

    return icon;
  }

  getStatistics(): void {
    const currentDate = new Date().toISOString().split('T')[0];

    this.parcelService.getDeliveredParcelsByDay(currentDate).subscribe(
      count => this.totalDeliveredToday = count
    );

    this.parcelService.getDeliveredParcelsByWeek(currentDate).subscribe(
      count => this.totalDeliveredThisWeek = count
    );

    this.parcelService.getDeliveredParcelsByMonth(currentDate).subscribe(
      count => this.totalDeliveredThisMonth = count
    );
  }

  getTopRatedDrivers(): void {
    this.ratingService.getTopRatedDrivers(3).subscribe({
      next: (drivers) => {
        this.topRatedDrivers = drivers;
        console.log('Top 3 rated drivers:', this.topRatedDrivers);
      },
      error: (err) => console.error('Error fetching top-rated drivers', err)
    });
  }

  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - (fullStars + halfStar);
  
    return [
      ...new Array(fullStars).fill('full'),
      ...new Array(halfStar).fill('half'),
      ...new Array(emptyStars).fill('empty'),
    ];
  }

  getVehiclesWithExpiredInsurance(): void {
    this.vehicleService.getVehiclesWithExpiredInsurance().subscribe({
      next: (data) => {
        this.vehiclesWithExpiredInsurance = data;
        console.log('Vehicles with expired insurance:', this.vehiclesWithExpiredInsurance);
      },
      error: (err) => console.error('Error fetching vehicles with expired insurance', err)
    });
  }
}