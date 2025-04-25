import { Component } from '@angular/core';
import { ParcelService } from 'src/app/Core/parcel.service';  // Assurez-vous que le service est bien importé

@Component({
    selector: 'app-parcel-detail-back-office',
    templateUrl: './parcel-detailBackOffice.component.html',
    styleUrls: ['./parcel-detailBackOffice.component.css'],
    standalone: false
})
export class ParcelDetailBackOfficeComponent {
    damagedParcels: any[] = [];  // Tableau pour stocker les colis endommagés

    constructor(private parcelService: ParcelService) { }
  
    ngOnInit(): void {
      this.loadDamagedParcels();  // Charger les colis endommagés au démarrage
    }
  
    // Méthode pour récupérer les colis endommagés
    loadDamagedParcels(): void {
      this.parcelService.getDamagedParcels().subscribe(
        (data) => {
          this.damagedParcels = data;  // Stocker les colis endommagés récupérés
        },
        (error) => {
          console.error('Erreur lors de la récupération des colis endommagés', error);
        }
      );
    }
}
