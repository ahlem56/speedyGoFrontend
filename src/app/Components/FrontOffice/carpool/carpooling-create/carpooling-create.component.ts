import { Component, OnInit } from '@angular/core';
import { CarpoolService } from 'src/app/Core/carpool.service';
import { UserService } from 'src/app/Core/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-carpool-create',
  templateUrl: './carpooling-create.component.html',
  styleUrls: ['./carpooling-create.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CarpoolingCreateFrontOfficeComponent implements OnInit {
  carpool: any = {
    carpoolDeparture: '',
    carpoolDestination: '',
    carpoolDate: '',
    carpoolTime: '',
    carpoolCapacity: null,
    carpoolCondition:'',
    carpoolPrice :null,
    licensePlate:'',
  };
  simpleUserId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  myCarpools: any[] = [];  // Array to store joined carpools
  filteredCarpools: any[] = [];  // Array to store future carpools

  constructor(
    private carpoolService: CarpoolService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Récupérer l'utilisateur connecté depuis le localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.simpleUserId = currentUser.userId;

    console.log("SimpleUser ID: ", this.simpleUserId);
  }

  createCarpool() {
    if (!this.simpleUserId) {
      this.errorMessage = 'User ID is not available.';
      return;
    }

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.carpoolService.createCarpool(this.carpool, this.simpleUserId, headers).subscribe(
      (createdCarpool) => {
        console.log('Carpool Created', createdCarpool);
        this.successMessage = 'Your carpool has been created successfully!';
        this.errorMessage = '';

        // Réinitialiser le formulaire
        this.carpool = {
          carpoolDeparture: '',
          carpoolDestination: '',
          carpoolDate: '',
          carpoolTime: '',
          carpoolCapacity: null,
          carpoolCondition:'',
          carpoolPrice :null,
          licensePlate:'',
        };
      },
    
    );
  }
  joinCarpool() {
    this.router.navigate(['/carpooling/']);
  }
  
  showForm = false;

  displayForm() {
    this.showForm = true; 
};










showMyCarpools() {
  if (!this.simpleUserId) {
    this.errorMessage = 'User ID is not available.';
    return;
  }

  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.carpoolService.getCarpoolsJoinedByUser(this.simpleUserId, headers).subscribe(
    (carpools) => {
      // Filtrage des covoiturages futurs
      this.filteredCarpools = this.filterFutureCarpools(carpools);
      console.log("My Future Carpools: ", this.filteredCarpools);
    },
    (error) => {
      this.errorMessage = 'Error fetching your carpools.';
      console.error(error);
    }
  );
}

// Filtrage des covoiturages futurs
filterFutureCarpools(carpools: any[]): any[] {
  const today = new Date();
  console.log("Date d'aujourd'hui :", today);

  return carpools.filter(carpool => {
    const carpoolDate = new Date(carpool.carpoolDate);
    console.log(`Comparaison : ${carpoolDate} >= ${today} ?`, carpoolDate >= today);
    return carpoolDate >= today;  // On garde seulement les covoiturages futurs
  });
}



viewCarpoolDetails(carpoolId: number) {
  this.router.navigate([`/carpooling/join/${carpoolId}`]);
}






}