import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarpoolService } from 'src/app/Core/carpool.service';
import { HttpHeaders } from '@angular/common/http';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-carpooling-detail',
  templateUrl: './carpooling-detail.component.html',
  styleUrls: ['./carpooling-detail.component.css']
})
export class CarpoolingDetailFrontOfficeComponent implements OnInit {
  protected carpoolDetails: any; // Détails du covoiturage
  carpoolId!: number; // ID du covoiturage
  errorMessage: string = ''; // Message d'erreur
  successMessage: string = ''; // Message de succès
  offererDetails: any; // Stocker les infos de l'offreur


  constructor(
    private route: ActivatedRoute, // Pour récupérer l'ID du covoiturage depuis l'URL
    private router: Router, // Pour la navigation
    private carpoolService: CarpoolService // Service pour les opérations sur les covoiturages
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du covoiturage depuis l'URL
    this.carpoolId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.carpoolId) {
      this.errorMessage = "❌ ID du covoiturage introuvable.";
      return;
    }

    // Charger les détails du covoiturage
    this.loadCarpoolDetails();
    this.loadOffererDetails(); // Charger les infos de l'offreur

  }

  // Charger les détails du covoiturage
  loadCarpoolDetails(): void {
    const token = localStorage.getItem('authToken'); // Récupérer le token d'authentification

    if (!token) {
      this.errorMessage = "❌ Aucun token trouvé. Veuillez vous connecter.";
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token dans les en-têtes

    // Appeler le service pour récupérer les détails du covoiturage
    this.carpoolService.getCarpoolById(this.carpoolId, headers).subscribe({
      next: (data) => {
        this.carpoolDetails = data; // Stocker les détails du covoiturage
        console.log("📥 Détails du covoiturage récupérés :", data);
        console.log("Offreur :", data.simpleUserOffer); // Vérifiez les données de l'offreur

      },
      error: (error) => {
        console.error("❌ Erreur API :", error);
        if (error.status === 401) {
          this.errorMessage = "Votre session a expiré. Veuillez vous reconnecter.";
          localStorage.removeItem('authToken'); // Supprimer le token expiré
          this.router.navigate(['/login']); // Rediriger vers la page de connexion
        } else {
          this.errorMessage = "Impossible de charger les détails du covoiturage.";
        }
      }
    });
  }

  // Rejoindre un covoiturage
  joinCarpool(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.errorMessage = "❌ Aucun utilisateur connecté trouvé. Veuillez vous connecter.";
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.userId;

    const token = localStorage.getItem('authToken');
    if (!token) {
      this.errorMessage = "❌ Aucun token trouvé. Veuillez vous connecter.";
      this.router.navigate(['/login']);
      return;
    }

    console.log("Token envoyé :", token); // Vérifie si le token est bien récupéré

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json'); // Assure-toi que le header est bien formatté

    this.carpoolService.joinCarpool(this.carpoolId, userId, headers).subscribe({
      next: () => {
        this.successMessage = "✅ Vous avez rejoint ce covoiturage avec succès !";
        this.errorMessage = '';
        setTimeout(() => {
          this.router.navigate([`/carpooling/join/${this.carpoolId}`]);
        }, 2000);
      },
      error: (error) => {
        console.error("❌ Erreur lors de la tentative de rejoindre le covoiturage :", error);

        if (error.status === 401) {
          this.errorMessage = "⛔ You can't join this carpool !";
        } else if (error.status === 403) {
          this.errorMessage = "⛔ Vous ne pouvez pas rejoindre votre propre covoiturage.";
        } else {
          this.errorMessage = "❌ Une erreur est survenue.";
        }
      }
    });
  }

  loadOffererDetails(): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      this.errorMessage = "❌ Aucun token trouvé. Veuillez vous connecter.";
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.carpoolService.getCarpoolOfferer(this.carpoolId, headers).subscribe({
      next: (data) => {
        this.offererDetails = data;
      },
      error: (error) => {
        console.error("❌ Erreur lors de la récupération de l'offreur :", error);
        this.errorMessage = "Impossible de charger les informations de l'offreur.";
      }
    });
  }
}
