import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/Core/trip.service';  // Import TripService
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
  imports: [DatePipe, CurrencyPipe, CommonModule, FormsModule]
})
export class TripListDriverInterfaceComponent implements OnInit {
  trips: any[] = [];  // Liste complète des voyages
  filteredTrips: any[] = [];  // Liste filtrée des voyages
  searchTerm: string = '';  // Terme de recherche
  selectedStatus: string = 'all';  // Statut sélectionné pour le filtrage
  isLoading: boolean = true;  // État de chargement
  errorMessage: string | null = null;  // Message d'erreur

  // Définir les statuts des voyages (adaptez-les à votre backend)
  tripStatuses = [
    { value: 'all', label: 'All Trips' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'CANCELLED', label: 'Cancelled' }
  ];

  constructor(private tripService: TripService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  // Charger les voyages depuis le backend
  loadTrips(): void {
    // Récupérer l'utilisateur depuis localStorage
    const userStr = localStorage.getItem('user');

    if (!userStr) {
      this.errorMessage = 'User not found in localStorage. Please log in again!';
      this.isLoading = false;
      return;
    }

    const user = JSON.parse(userStr);  // Parser l'objet utilisateur
    const driverId = user.userId;  // Extraire l'ID du conducteur

    console.log('Driver ID:', driverId);  // Log l'ID du conducteur pour vérification

    if (!driverId || isNaN(driverId)) {  // Vérifier si l'ID est valide
      this.errorMessage = 'Invalid driver ID!';
      this.isLoading = false;
      return;
    }

    // Configurer les en-têtes pour la requête
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });

    // Appeler le service pour obtenir les voyages du conducteur
    this.tripService.getTripsForDriver(driverId, headers).subscribe({
      next: (response) => {
        this.trips = response;  // Assigner la réponse à la liste des voyages
        this.filteredTrips = response;  // Initialiser la liste filtrée
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching trips:', error);
        this.errorMessage = 'Failed to load trips. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  // Appliquer les filtres (recherche et statut)
  applyFilters(): void {
    this.filteredTrips = this.trips.filter(trip => {
      const matchesSearch = trip.tripDeparture.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            trip.tripDestination.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || trip.reservationStatus === this.selectedStatus;
      return matchesSearch && matchesStatus;
    });
  
    // Sort trips by date in descending order (newest first)
    this.filteredTrips.sort((a, b) => new Date(b.tripDate).getTime() - new Date(a.tripDate).getTime());
  }
  

  // Accepter un voyage
  acceptTrip(trip: any): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });
  
    this.tripService.acceptTrip(trip.tripId, headers).subscribe({
      next: () => {
        trip.reservationStatus = 'CONFIRMED';  // Mettre à jour le statut du voyage
      },
      error: (error) => {
        console.error('Error accepting trip:', error);
        alert('Failed to accept trip. Please try again.');
      }
    });
  }
  
  // Refuser un voyage
  refuseTrip(trip: any): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });
  
    this.tripService.refuseTrip(trip.tripId, headers).subscribe({
      next: () => {
        this.trips = this.trips.filter(t => t.tripId !== trip.tripId);  // Supprimer le voyage de la liste
        this.applyFilters();  // Re-appliquer les filtres
      },
      error: (error) => {
        console.error('Error refusing trip:', error);
        alert('Failed to refuse trip. Please try again.');
      }
    });
  }

  completeTrip(trip: any): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    });
  
    this.tripService.completeTrip(trip.tripId, headers).subscribe({
      next: () => {
        trip.reservationStatus = 'COMPLETED';  // Update the trip status to "COMPLETED"
        alert("Trip completed! The passenger will be notified to rate the driver.");
      },
      error: (error) => {
        console.error('Error completing trip:', error);
        alert('Failed to complete the trip. Please try again.');
      }
    });
  }
  
}