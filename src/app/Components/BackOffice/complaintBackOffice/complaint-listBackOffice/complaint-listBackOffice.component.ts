import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ComplaintService } from 'src/app/Core/complaint.service';
import { UserService } from 'src/app/Core/user.service';


@Component({
  selector: 'app-complaint-list-backoffice',
  templateUrl: './complaint-listBackOffice.component.html',
  styleUrls: ['./complaint-listBackOffice.component.css']
})
export class ComplaintListBackOfficeComponent implements OnInit {
  complaints: any[] = [];
  isLoading: boolean = false; // Pour afficher un indicateur de chargement

  constructor(private complaintService: ComplaintService, private router: Router) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  // Charger les réclamations
  loadComplaints(): void {
    this.isLoading = true; // Afficher l'indicateur de chargement

    const headers = this.getAuthHeaders(); // Obtenir les en-têtes d'authentification

    this.complaintService.getAllComplaints(headers).subscribe({
      next: (response) => {
        this.complaints = response;
        this.isLoading = false; // Masquer l'indicateur de chargement
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réclamations :', error);
        this.isLoading = false; // Masquer l'indicateur de chargement
        alert('Erreur lors du chargement des réclamations.');
      }
    });
  }

  // Rediriger vers les détails d'une réclamation
  viewDetails(complaintId: number): void {
    this.router.navigate(['back-office/complaints', complaintId]);
  }

  // Méthode utilitaire pour obtenir les en-têtes d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('Utilisateur non authentifié.');
    }
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
}