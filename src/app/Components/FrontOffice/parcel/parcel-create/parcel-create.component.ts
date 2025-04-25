import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParcelService } from 'src/app/Core/parcel.service';
import { UserService } from 'src/app/Core/user.service';

@Component({
    selector: 'app-parcel-create',
    templateUrl: './parcel-create.component.html',
    styleUrls: ['./parcel-create.component.css'],
    standalone: false
})
export class ParcelCreateFrontOfficeComponent {
    parcel: any = {  // Form data for the parcel
        parcelWeight: null,
        parcelPrice: null,
        parcelCategory: '', // Newly added
        recepeientPhoneNumber: null, // Newly added
        senderPhoneNumber: null, // Newly added
        parcelDeparture: '', // Newly added
        parcelDestination: '', // Newly added
      };
      simpleUserId: number | null = null;  // Store the SimpleUser ID
      errorMessage: string = '';  // To store error messages
      successMessage: string = '';  // To store success message
      
      constructor(
        private parcelService: ParcelService,
      private router: Router,
        private userService: UserService // Inject UserService to get the logged-in user's ID
      ) {}
    
      ngOnInit() {
        // Assign SimpleUser ID from the logged-in user stored in localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        this.simpleUserId = currentUser.userId;  // You should already have the user info in localStorage
        console.log("SimpleUser ID: ", this.simpleUserId);  // Verify the SimpleUser ID
      }
    
      createParcel() {
        const token = localStorage.getItem('authToken');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        if (!this.parcel.parcelWeight || !this.parcel.parcelPrice || !this.parcel.parcelCategory || !this.parcel.recepeientPhoneNumber || !this.parcel.senderPhoneNumber || !this.parcel.parcelDeparture || !this.parcel.parcelDestination) {
          this.errorMessage = 'Please fill out all fields';
          return;
        }
      
        if (!this.simpleUserId) {
          this.errorMessage = 'User ID is not available.';
          return;
        }
      
        this.parcelService.createParcel(this.parcel, this.simpleUserId, headers).subscribe(
          (createdParcel: any) => {
            console.log('Parcel Created:', createdParcel);
            this.successMessage = 'Your parcel has been created successfully!';
            this.errorMessage = '';  // Clear any previous error message
      
            // Redirect to "payments/create" after parcel creation
            this.router.navigate(['/payments/create']);
      
            // Reset the form
            this.parcel = { parcelName: '', parcelWeight: null, parcelDimensions: '', parcelPrice: null };  
          },
          (error: any) => {
            this.errorMessage = 'Failed to create parcel. Please try again later.';
            console.error(error);
          }
        );
      }
      
      onKeyPress(event: KeyboardEvent) {
        const charCode = event.which ? event.which : event.keyCode;
        // Vérifie si le caractère est un chiffre (0-9)
        if (charCode < 48 || charCode > 57) {
            event.preventDefault(); // Empêche la saisie
        }
      }
      // Method to update the parcel price based on the weight
    updateParcelPrice() {
      const weight = this.parcel.parcelWeight;

      if (weight >= 0.1 && weight <= 5) {
          this.parcel.parcelPrice = 10;  // Price for 0.1-5 kg
      } else if (weight > 5 && weight <= 20) {
          this.parcel.parcelPrice = 20;  // Price for 5-20 kg
      } else if (weight > 20) {
          this.parcel.parcelPrice = 30;  // Price for >20 kg
      }
  }
    }