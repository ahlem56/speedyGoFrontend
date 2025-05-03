import { Component, OnInit } from '@angular/core';
import { CarpoolService } from 'src/app/Core/carpool.service';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/Core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carpooling-offer',
  templateUrl: './carpooling-offer.component.html',
  styleUrls: ['./carpooling-offer.component.scss']
})
export class CarpoolingOfferFrontOfficeComponent implements OnInit {
  userId: number | null = null; // ID de l'utilisateur connecté
  carpools: any[] = []; // Liste des covoiturages
  editingCarpoolId: number | null = null; // ID du covoiturage en cours de modification
  updatedCarpool: any = {}; // Objet pour stocker les modifications
  showPastCarpools: boolean = false; // Permet d'afficher les trajets passés
  filteredCarpools: any[] = []; // Liste des covoiturages après filtrage
  usersWhoJoined: any[] = []; // Liste des utilisateurs ayant rejoint le covoiturage
  getUsersCarpoolId: number | null = null;
  noUsersMessage: string = ''; // Pour afficher un message quand il n'y a pas d'utilisateurs
  isLoading: boolean = false; // Pour afficher ou masquer le chargement

  constructor(
    private carpoolService: CarpoolService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    // Récupérer l'utilisateur connecté depuis le localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = currentUser.userId; // Mettre à jour userId avec l'ID de l'utilisateur connecté

    if (this.userId) {
      this.loadCarpools(); // Charger les covoiturages si userId est disponible
    } else {
      console.error("Aucun utilisateur connecté trouvé.");
      this.router.navigate(['/login']); // Rediriger vers la page de connexion si aucun utilisateur n'est connecté
    }
  }
  filterCarpools(): void {
    const today = new Date();
    console.log("Date d'aujourd'hui :", today);
  
    this.filteredCarpools = this.carpools.filter(carpool => {
      const carpoolDate = new Date(carpool.carpoolDate);
      console.log(`Comparaison : ${carpoolDate} >= ${today} ?`, carpoolDate >= today);
      return this.showPastCarpools ? carpoolDate < today : carpoolDate >= today;
    });
  
    console.log("Covoiturages après filtrage :", this.filteredCarpools);
  }
  
  // Charger les covoiturages de l'utilisateur
  loadCarpools(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.carpoolService.getCarpoolsByUser(this.userId!, headers).subscribe({
      next: (data) => {
        this.carpools = data;
        console.log("Covoiturages récupérés :", this.carpools); // Ajoute ce log
        this.filterCarpools(); // Appliquer le filtre après récupération des données
      },
      error: (err) => {
        console.error("Erreur lors du chargement des covoiturages", err);
      }
    });
  }
  
  
  togglePastCarpools(): void {
    this.showPastCarpools = !this.showPastCarpools;
    this.filterCarpools();
  }


   // Démarrer l'édition d'un covoiturage
  getUsers(carpoolId: number): void {
    this.getUsersCarpoolId = carpoolId;
    // Pré-remplir le formulaire avec les données du covoiturage sélectionné
    const carpool = this.carpools.find(c => c.carpoolId === carpoolId);
    if (carpool) {
      this.loadUsersWhoJoined(carpoolId); 
    }
  
  }
  // Démarrer l'édition d'un covoiturage
  startEditing(carpoolId: number): void {
    this.editingCarpoolId = carpoolId;
    // Pré-remplir le formulaire avec les données du covoiturage sélectionné
    const carpool = this.carpools.find(c => c.carpoolId === carpoolId);
    if (carpool) {
      this.updatedCarpool = { ...carpool };
      this.loadUsersWhoJoined(carpoolId); 
    }
  }

  // Annuler l'édition
  cancelEditing(): void {
    this.editingCarpoolId = null; // Réinitialiser l'ID du covoiturage en cours de modification
    this.updatedCarpool = {}; // Réinitialiser les modifications
  }

  // Mettre à jour les champs du formulaire
  updateField(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updatedCarpool[field] = value;
  }

  updateCarpool(carpoolId: number, updatedCarpool: any): void {
    const token = localStorage.getItem('token'); // Récupérer le token
    if (!token) {
      console.error("Aucun token d'authentification trouvé.");
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token aux headers
    if (this.usersWhoJoined.length > 0) {
      alert("You can't change this carpool because there are users who have already joined.");
      return; // Empêche la mise à jour
    }
    // Vérifiez les données envoyées
    console.log("Données envoyées :", updatedCarpool);
  
    this.carpoolService.updateCarpool(carpoolId, this.userId!, updatedCarpool, headers).subscribe({
      next: () => {
        if(true){
        console.log("Covoiturage mis à jour avec succès !");
        this.editingCarpoolId = null; // Fermer le formulaire
        this.loadCarpools(); // Recharger la liste après mise à jour
        }

      },
      
      error: (err) => {
        if (err.status === 401) {
          // Token expiré ou invalide
          console.error("Token expiré ou invalide. Redirection vers la page de connexion.");
          this.router.navigate(['/login']); // Rediriger vers la page de connexion
        } else {
          console.error("Erreur lors de la mise à jour du covoiturage", err);
        }
      }
    });
  }




  deleteCarpool(carpoolId: number): void {
    const token = localStorage.getItem('token'); // Récupérer le token
    if (!token) {
      console.error("Aucun token d'authentification trouvé.");
      this.router.navigate(['/login']); // Rediriger vers la page de connexion
      return;
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Ajouter le token aux headers
  
    if (!this.userId) {
      console.error("Utilisateur non trouvé.");
      return;
    }
  
    if (confirm("Êtes-vous sûr de vouloir supprimer ce covoiturage ?")) {
      this.carpoolService.deleteCarpool(carpoolId, this.userId, headers).subscribe({
        next: () => {
          console.log("Covoiturage supprimé avec succès !");
          this.loadCarpools(); // Recharger la liste des covoiturages
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du covoiturage", err);
        }
      });
    }
  }



  

  loadUsersWhoJoined(carpoolId: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Afficher l'état de chargement
    this.isLoading = true; // Assurez-vous de déclarer la variable isLoading dans la classe (voir ci-dessous)
  
    this.carpoolService.getUsersWhoJoinedCarpool(carpoolId, headers).subscribe({
      next: (users) => {
        console.log("Utilisateurs ayant rejoint le covoiturage :", users);
        this.usersWhoJoined = users; // Stocker les utilisateurs dans la variable
  
        // Si aucun utilisateur n'a rejoint, afficher un message
        if (this.usersWhoJoined.length === 0) {
          this.noUsersMessage = "Aucun utilisateur n'a rejoint ce covoiturage."; // Déclarez cette variable dans la classe (voir ci-dessous)
        } else {
          this.noUsersMessage = ''; // Réinitialiser le message
        }
  
        // Arrêter l'état de chargement
        this.isLoading = false; // Réinitialiser l'état de chargement
      },
      error: (err) => {
        console.error("Erreur lors du chargement des utilisateurs ayant rejoint le covoiturage", err);
        this.isLoading = false; // Arrêter l'état de chargement en cas d'erreur
      },
    });
  }
  
  
}