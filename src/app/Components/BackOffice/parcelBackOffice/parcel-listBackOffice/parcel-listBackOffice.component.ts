import { Component } from '@angular/core';
import { ParcelService } from 'src/app/Core/parcel.service';
import { DriverService } from 'src/app/Core/driver.service';  // Assurez-vous d'importer le service des conducteurs


@Component({
    selector: 'app-parcel-list',
    templateUrl: './parcel-listBackOffice.component.html',
    styleUrls: ['./parcel-listBackOffice.component.css'],
    standalone: false
})
export class ParcelListBackOfficeComponent {
  parcels: any[] = [];
  drivers: any[] = [];
  selectedDrivers: { [key: number]: number } = {}; // Stocke le driver sélectionné par colis

  constructor(private parcelService: ParcelService, private driverService: DriverService) {}

  ngOnInit(): void {
      this.loadParcels();
      this.loadDrivers();
  }

  // Charger la liste des colis
  loadParcels() {
      this.parcelService.getParcels().subscribe(
          (data) => { this.parcels = data; },
          (error) => { console.error('Erreur lors de la récupération des colis', error); }
      );
  }

  // Charger la liste des chauffeurs
  loadDrivers() {
      this.driverService.getAllDrivers().subscribe(
          (data) => { this.drivers = data; },
          (error) => { console.error('Erreur lors de la récupération des conducteurs', error); }
      );
  }

  // Assigner un chauffeur à un colis
  assignParcel(parcelId: number) {
      const driverId = this.selectedDrivers[parcelId];
      if (driverId) {
          this.parcelService.assignParcelToDriver(parcelId, driverId).subscribe(
              response => {
                  alert('Parcel assigned successfully!');
                  this.loadParcels();  // Rafraîchir la liste
              },
              error => {
                  alert('Failed to assign parcel');
                  console.error(error);
              }
          );
      } else {
          alert('Please select a driver!');
      }
  }

}
