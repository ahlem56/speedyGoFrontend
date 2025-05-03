import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarpoolService } from 'src/app/Core/carpool.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-carpooling-join',
    templateUrl: './carpooling-join.component.html',
    styleUrls: ['./carpooling-join.component.css'],
    standalone: false
})
export class CarpoolingJoinFrontOfficeComponent implements OnInit {

    carpoolId!: number;
    errorMessage: string = '';
    successMessage: string = '';
    
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private carpoolService: CarpoolService
    ) {}
  
    ngOnInit(): void {
      this.carpoolId = Number(this.route.snapshot.paramMap.get('id'));
      if (!this.carpoolId) {
        this.errorMessage = "❌ ID du covoiturage introuvable.";
        return;
      }
    
      console.log("🔍 Covoiturage sélectionné :", this.carpoolId);
    }
  
    leaveCarpool(): void {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        this.errorMessage = "❌ Aucun utilisateur connecté trouvé.";
        this.router.navigate(['/login']);
        return;
      }
  
      const user = JSON.parse(storedUser);
      const userId = user.userId;
  
      const token = localStorage.getItem('token');
      if (!token) {
        this.errorMessage = "❌ Aucun token trouvé.";
        this.router.navigate(['/login']);
        return;
      }
  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
      this.carpoolService.leaveCarpool(this.carpoolId, userId, headers).subscribe({
        next: () => {
          this.successMessage = "✅ Vous avez quitté le covoiturage.";
          setTimeout(() => {
            this.router.navigate(['/carpooling']);
          }, 2000);
        },
        error: (error) => {
          console.error("❌ Erreur :", error);
          this.errorMessage = "Erreur lors du départ du covoiturage.";
        }
      });
    }


}
