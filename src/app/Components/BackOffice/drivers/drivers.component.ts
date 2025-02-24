import { Component } from '@angular/core';
import { Driver, DriverService } from 'src/app/Core/driver.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drivers',
  imports: [CommonModule],
  standalone: true, // Si standalone est utilisé
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',

})
export class DriversBackOfficeComponent {
  drivers: any[] = [];  // Remplacer Driver[] par any[]

  constructor(private driversService: DriverService) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driversService.getAllDrivers().subscribe(
      (data) => {
        console.log('Drivers data:', data);  // Vérifier si les données sont bien récupérées
        this.drivers = data;
      },
      (error) => {
        console.error('Error fetching drivers:', error);
      }
    );
  }

}
