import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService, LocationRecord } from '../../../../Core/vehicle.service';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-vehicle-travel-history',
  templateUrl: './vehicle-travel-history.component.html',
  styleUrls: ['./vehicle-travel-history.component.scss'],
  imports:[CommonModule]
})
export class VehicleTravelHistoryComponent implements OnInit {
  vehicleId!: number;
  travelHistory: LocationRecord[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Extraction du paramètre "id" de la route
    this.vehicleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadTravelHistory();
  }

  loadTravelHistory(): void {
    this.vehicleService.getTravelHistory(this.vehicleId).subscribe({
      next: (data) => {
        this.travelHistory = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l’historique du trajet :', err);
        this.errorMessage = 'Impossible de récupérer l’historique du trajet.';
        this.isLoading = false;
      }
    });
  }

  back(): void {
    this.router.navigate(['/back-office/vehicles']);
  }
}
