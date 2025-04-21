import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { ParcelService } from 'src/app/Core/parcel.service';
import { RatingService } from 'src/app/Core/rating.service';
//declare var require: any;

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
  topRatedDrivers: any[] = [];


  constructor(private http: HttpClient,private parcelService: ParcelService, private ratingService : RatingService) {}

  ngOnInit(): void {
    this.getTotalUsers();
    this.getTotalTrips();
    this.getTripsByLocation();  // Fetch trips by location
    this.getStatistics();
    this.getTopRatedDrivers();

  }

  getTotalUsers(): void {
    this.http.get<number>('http://localhost:8089/examen/Admin/total-users')
      .subscribe({
        next: (data) => {
          this.totalUsers = data;
        },
        error: (err) => {
          console.error('Error fetching total users', err);
        }
      });
  }

  getTotalTrips(): void {
    this.http.get<number>('http://localhost:8089/examen/Admin/total-trips')
      .subscribe({
        next: (data) => {
          this.totalTrips = data;
        },
        error: (err) => {
          console.error('Error fetching total trips', err);
        }
      });
  }

  getTripsByLocation(): void {
    this.http.get<any[]>('http://localhost:8089/examen/Admin/trips-by-location')
      .subscribe({
        next: (data) => {
          this.trips = data;
          console.log('Trips data:', this.trips);  // Make sure this is populated with correct data
        },
        error: (err) => {
          console.error('Error fetching trips by location', err);
        }
      });
  }

  // Function to determine the marker icon based on tripCount
  getMarkerIcon(trip: any): google.maps.Icon {
    // Create a base icon style
    let icon = {
      url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
      scaledSize: new google.maps.Size(30, 30),
    };

    // Check if it's one of the most visited locations and change the icon accordingly
    if (trip.tripCount > 50) {
      icon = {
        url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Use a different color/icon for most visited
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
  totalDeliveredToday: number = 0;
  totalDeliveredThisWeek: number = 0;
  totalDeliveredThisMonth: number = 0;


 
  // Récupérer les statistiques pour aujourd'hui, cette semaine et ce mois
  getStatistics(): void {
    const currentDate = new Date().toISOString().split('T')[0]; // Formater la date au format 'YYYY-MM-DD'

    // Appeler le service pour récupérer les statistiques
    this.parcelService.getDeliveredParcelsByDay(currentDate).subscribe(count => {
      this.totalDeliveredToday = count;
    });

    this.parcelService.getDeliveredParcelsByWeek(currentDate).subscribe(count => {
      this.totalDeliveredThisWeek = count;
    });

    this.parcelService.getDeliveredParcelsByMonth(currentDate).subscribe(count => {
      this.totalDeliveredThisMonth = count;
    });
  }

  getTopRatedDrivers(): void {
    this.ratingService.getTopRatedDrivers(3).subscribe({
      next: (drivers) => {
        this.topRatedDrivers = drivers;
        console.log('Top 3 rated drivers:', this.topRatedDrivers);  // Check the data
      },
      error: (err) => {
        console.error('Error fetching top-rated drivers', err);
      }
      
    });
  }


  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating); // Full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star if remainder is 0.5 or more
    const emptyStars = 5 - (fullStars + halfStar); // Remaining empty stars
  
    return [
      ...new Array(fullStars).fill('full'),
      ...new Array(halfStar).fill('half'),
      ...new Array(emptyStars).fill('empty'),
    ];
  }
  
}
