import { Component } from '@angular/core';
import { ParcelService } from 'src/app/Core/parcel.service';

@Component({
    selector: 'app-parcel-list',
    templateUrl: './parcel-list.component.html',
    styleUrls: ['./parcel-list.component.css'],
    standalone: false
})
export class ParcelListDriverInterfaceComponent {
    parcels: any[] = [];
    driverId: number | null = null;
  
    constructor(private parcelService: ParcelService) {}
  
    ngOnInit(): void {
        const driver = localStorage.getItem('driver'); // Récupération de l'objet Driver depuis localStorage
        if (driver) {
          const driverObj = JSON.parse(driver); // Convertir la chaîne JSON en objet
          this.driverId = driverObj.userId; // Utilisation de userId au lieu de id
          console.log('Driver ID récupéré depuis localStorage :', this.driverId); // Débogage
          this.loadParcels();
        } else {
          console.log('Aucun driver trouvé dans le localStorage');
        }
    }
  
    loadParcels(): void {
        if (this.driverId) {
            console.log('Chargement des colis pour le driver avec ID :', this.driverId); // Affiche l'ID du conducteur dans la console
            this.parcelService.getParcelsByDriver(this.driverId).subscribe(
              (data) => {
                console.log('Données des colis reçues :', data); // Affiche les données des colis reçues dans la console
                this.parcels = data;
              },
              (error) => {
                console.error('Erreur lors de la récupération des colis', error);
              }
            );
          } else {
            console.log('Aucun driverId trouvé, impossible de charger les colis');
          }
    }
}
