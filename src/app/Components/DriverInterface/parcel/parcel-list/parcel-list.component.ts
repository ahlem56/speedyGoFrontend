import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParcelService } from 'src/app/Core/parcel.service';

@Component({
    selector: 'app-parcel-list',
    templateUrl: './parcel-list.component.html',
    styleUrls: ['./parcel-list.component.css'],
    standalone: false
})
export class ParcelListDriverInterfaceComponent {
  parcels: any[] = [];  // Tableau pour stocker les colis du conducteur

  constructor(private parcelService: ParcelService, private router: Router) {}

  ngOnInit(): void {
    this.loadParcels();  // Charger les colis au démarrage du composant
  }

  loadParcels(): void {
    // Récupérer l'objet utilisateur depuis le localStorage
    const userStr = localStorage.getItem('user');

    if (!userStr) {
      alert('Utilisateur non trouvé dans le localStorage. Veuillez vous connecter à nouveau !');
      return;
    }

    const user = JSON.parse(userStr);  // Analyser l'objet utilisateur depuis la chaîne
    const driverId = user.userId; // Extraire l'ID du conducteur

    console.log('ID du conducteur:', driverId);  // Afficher l'ID pour vérifier sa validité

    if (!driverId || isNaN(driverId)) {  // Vérifier si l'ID est valide
      alert('ID du conducteur invalide !');
      return;
    }

    // Préparer les headers pour la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Utiliser le token d'authentification
    });

    // Appeler le service pour récupérer les colis du conducteur
    this.parcelService.getParcelForDriver(driverId, headers).subscribe(
      (response) => {
        this.parcels = response;  // Assignation des colis reçus dans le tableau
      },
      (error) => {
        console.error('Erreur lors de la récupération des colis:', error);
        alert('Échec du chargement des colis!');
      }
    );
  }
}
