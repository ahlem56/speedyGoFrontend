import { Component } from '@angular/core';
import { ParcelService } from 'src/app/Core/parcel.service';

@Component({
    selector: 'app-parcel-list',
    templateUrl: './parcel-listBackOffice.component.html',
    styleUrls: ['./parcel-listBackOffice.component.css'],
    standalone: false
})
export class ParcelListBackOfficeComponent {
    parcels: any[] = [];

  constructor(private parcelService: ParcelService) {}

  ngOnInit(): void {
    this.loadParcels();
  }

  loadParcels() {
    this.parcelService.getParcels().subscribe(
      (data) => {
        this.parcels = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des colis', error);
      }
    );
  }

}
