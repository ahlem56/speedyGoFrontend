import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DriverService } from 'src/app/Core/driver.service';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class CreateDriverBackOfficeComponent {

  driver = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    availabilityD: false,
    cin: '',    // Added contact field
    address: ''     // Added address field
  };

  successMessage = '';  // Variable to store success message
  errorMessage = '';    // Variable to store error message
  
  constructor(private driverService: DriverService) { }

  createDriver() {
    this.driverService.createDriver(this.driver).subscribe(
      (response) => {
        this.successMessage = 'Driver created successfully!';
        this.errorMessage = '';  // Clear any previous errors
        console.log('Driver created successfully!', response);
      },
      (error) => {
        this.errorMessage = 'Error creating driver. Please try again.';
        this.successMessage = '';  // Clear any previous success messages
        console.error('Error creating driver:', error);
      }
    );
  }
}
