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
  successMessage: string = '';
  errorMessage: string = '';

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

  deleteDriver(driverId: number): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driversService.deleteDriver(driverId).subscribe(
        () => {
          this.successMessage = 'Driver deleted successfully!';
          this.loadDrivers(); // Reload the drivers list after deletion
        },
        (error) => {
          this.errorMessage = 'Error deleting driver. Please try again.';
          console.error('Error deleting driver:', error);
        }
      );
    }
  }

    // New method to handle the add driver action
    openAddDriverForm(): void {
      // You can open a form or navigate to another page to add the driver
      // For example, let's just log it for now:
      console.log('Open Add Driver Form');
      // Or you can use Angular routing to navigate to a separate add-driver component
      // this.router.navigate(['/add-driver']);
    }

}
