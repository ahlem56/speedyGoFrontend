import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ParcelService } from 'src/app/Core/parcel.service';
//declare var require: any;

@Component({
    templateUrl: './dashboard.component.html',
    standalone: false
})
export class DashboardComponent implements OnInit {
  totalDeliveredToday: number = 0;
  totalDeliveredThisWeek: number = 0;
  totalDeliveredThisMonth: number = 0;

  constructor(private parcelService: ParcelService) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  // Récupérer les statistiques pour aujourd'hui, cette semaine et ce mois
  getStatistics(): void {
    const currentDate = new Date().toISOString().split('T')[0]; // Formater la date au format 'YYYY-MM-DD'

    // Appeler le service pour récupérer les statistiques
    this.parcelService.getDeliveredParcelsByDay(currentDate).subscribe(count => {
      this.totalDeliveredToday = count;
    });

    this.parcelService.getDeliveredParcelsByWeek(currentDate).subscribe(count => {
      this.totalDeliveredThisWeek = count;
    });

    this.parcelService.getDeliveredParcelsByMonth(currentDate).subscribe(count => {
      this.totalDeliveredThisMonth = count;
    });
  }
}
