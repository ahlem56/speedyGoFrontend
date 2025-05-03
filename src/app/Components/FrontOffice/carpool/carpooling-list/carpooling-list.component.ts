import { Component, OnInit } from '@angular/core';
import { CarpoolService } from 'src/app/Core/carpool.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
    selector: 'app-carpooling-list-front-office',
    templateUrl: './carpooling-list.component.html',
    styleUrls: ['./carpooling-list.component.css'],
    standalone: false
})
export class CarpoolingListFrontOfficeComponent implements OnInit {
  futureCarpools: any[] = [];
  isLoading: boolean = true;
  errorMessage: string | null = null;


  constructor(private carpoolService: CarpoolService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log("Token récupéré:", token); // Vérifie si un token est récupéré
    this.loadFutureCarpools();
  }
  
  

  loadFutureCarpools(): void {
    this.carpoolService.getFutureCarpools().subscribe({
      next: (data) => {
        this.futureCarpools = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Erreur lors du chargement des covoiturages :", error);
        this.errorMessage = "Une erreur est survenue lors du chargement des covoiturages.";
        this.isLoading = false;
      }
    });
  }
  
  

}
