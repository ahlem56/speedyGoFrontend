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
        private userService: UserService // Inject UserService to get the logged-in user's ID
      ) {}
    
      ngOnInit() {
        // Assign SimpleUser ID from the logged-in user stored in localStorage
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        this.simpleUserId = currentUser.userId;  // You should already have the user info in localStorage
        console.log("SimpleUser ID: ", this.simpleUserId);  // Verify the SimpleUser ID
      }
    
      // Call the backend API to create the parcel
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
            this.parcel = { parcelName: '', parcelWeight: null, parcelDimensions: '', parcelPrice: null };  // Reset the form
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
}
