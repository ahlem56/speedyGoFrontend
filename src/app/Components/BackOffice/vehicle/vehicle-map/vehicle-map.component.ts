import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { TripService } from 'src/app/Core/trip.service';

declare const google: any;

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  standalone: true,
  styleUrls: ['./vehicle-map.component.scss']
})
export class VehicleMapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false })
  mapContainer!: ElementRef<HTMLDivElement>;

  private map!: google.maps.Map;
  private directionsService!: google.maps.DirectionsService;
  private directionsRenderer!: google.maps.DirectionsRenderer;

  public markers: google.maps.Marker[] = [];
  private waypointPositions: google.maps.LatLng[] = [];

  private currentLocationMarker!: google.maps.Marker;
  private thresholdMeters = 50;
  vehicleId!: number;

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.vehicleId = +this.route.snapshot.paramMap.get('id')!;
    this.loadRouteAndCheckpoints();
    this.startLocationWatch();
  }

  private initMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 36.8065, lng: 10.1815 },
      zoom: 8
    });
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      map: this.map,
      suppressMarkers: true
    });
  }

  private loadRouteAndCheckpoints(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.tripService.getTripsByVehicle(this.vehicleId, headers).subscribe({
      next: (trips: any[]) => {
        if (!trips.length) return;
        const { tripDeparture, tripDestination } = trips[0];

        this.directionsService.route({
          origin: tripDeparture,
          destination: tripDestination,
          travelMode: google.maps.TravelMode.DRIVING
        }, (result: any, status: any) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(result);
            const path = result.routes[0].overview_path as google.maps.LatLng[];

            // Add departure marker (green)
            this.addNamedMarker(result.routes[0].legs[0].start_location, `Departure: ${tripDeparture}`, 'green');

            // Add destination marker (red)
            this.addNamedMarker(result.routes[0].legs[0].end_location, `Destination: ${tripDestination}`, 'red');

            // Add checkpoints (orange with lat/lng info)
            this.setupCheckpoints(path, 9);
          } else {
            console.error('Directions request failed:', status);
          }
        });
      },
      error: (err: any) => console.error('Error fetching trips:', err)
    });
  }

  private addNamedMarker(position: google.maps.LatLng, label: string, color: string): void {
    const marker = new google.maps.Marker({
      position,
      map: this.map,
      title: label,
      icon: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${label}</strong><br>Lat: ${position.lat().toFixed(5)}, Lng: ${position.lng().toFixed(5)}`
    });

    marker.addListener('click', () => infoWindow.open(this.map, marker));
    this.markers.push(marker);
  }


  private setupCheckpoints(path: google.maps.LatLng[], count: number): void {
    const n = path.length;
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(i * (n - 1) / (count - 1));
      const pos = path[idx];
      this.waypointPositions.push(pos);

      // Set the first checkpoint to green
      const color = (i === 0) ? 'green' : 'orange'; // First checkpoint is green
      this.addNamedMarker(pos, `Checkpoint ${i + 1}`, color);
    }

    const bounds = new google.maps.LatLngBounds();
    this.waypointPositions.forEach(p => bounds.extend(p));
    this.map.fitBounds(bounds);
  }

  private startLocationWatch(): void {
    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      return;
    }

    navigator.geolocation.watchPosition(
      position => {
        this.ngZone.run(() => {
          const currentPos = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          if (!this.currentLocationMarker) {
            this.currentLocationMarker = new google.maps.Marker({
              position: currentPos,
              map: this.map,
              title: 'Your Location',
              icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
          } else {
            this.currentLocationMarker.setPosition(currentPos);
          }

          this.checkProximity(currentPos);
        });
      },
      error => console.error('Geolocation error:', error),
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
      }
    );
  }

  private checkProximity(current: google.maps.LatLng): void {
    this.markers.forEach((marker, index) => {
      const distance = google.maps.geometry.spherical.computeDistanceBetween(
        current,
        marker.getPosition() as google.maps.LatLng
      );
      if (distance <= this.thresholdMeters) {
        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
      }
    });
  }

  public markReached(index: number): void {
    if (this.markers[index]) {
      this.markers[index].setIcon(
        'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      );
    }
  }
}
