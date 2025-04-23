import { Component, OnInit, OnDestroy } from '@angular/core';
import { VehicleService } from '../../../../Core/vehicle.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as L from 'leaflet';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.scss']
})
export class VehicleMapComponent implements OnInit, OnDestroy {
  private map!: L.Map;
  private vehicleMarker!: L.Marker;
  private updateSubscription!: Subscription;
  protected vehicleId!: number;

  // Coordonnées par défaut (centre de la Tunisie)
  private defaultLat = 34.0;
  private defaultLng = 9.0;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.initMap();
    this.startTracking();
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.defaultLat, this.defaultLng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    const vehicleIcon = L.icon({
      iconUrl: 'assets/vehicle-marker.png',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    this.vehicleMarker = L.marker([this.defaultLat, this.defaultLng], {
      icon: vehicleIcon,
      draggable: false
    }).addTo(this.map);

    this.vehicleMarker.bindPopup('Vehicle ID: ' + this.vehicleId).openPopup();
  }

  private startTracking(): void {
    this.updateVehiclePosition();

    // toutes les 5 secondes
    this.updateSubscription = interval(5000).subscribe(() => {
      this.updateVehiclePosition();
    });
  }

  private updateVehiclePosition(): void {
    this.vehicleService.getVehicleById(this.vehicleId).subscribe(vehicle => {
      if (vehicle.latitude && vehicle.longitude) {
        const newLatLng = L.latLng(vehicle.latitude, vehicle.longitude);
        this.vehicleMarker.setLatLng(newLatLng);
        const updateTime = vehicle.updateTime
          ? new Date(vehicle.updateTime).toLocaleTimeString()
          : 'N/A';
        this.vehicleMarker.setPopupContent(`
          <b>Vehicle ${vehicle.vehicleModel}</b><br>
          Type: ${vehicle.vehicleType}<br>
          Position: ${vehicle.latitude.toFixed(4)}, ${vehicle.longitude.toFixed(4)}<br>
          Dernière mise à jour : ${updateTime}
        `);
        this.map.panTo(newLatLng, { animate: true, duration: 1 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/back-office/vehicles']);
  }
}
