import { Component } from '@angular/core';
import { PartnerService } from 'src/app/Core/partner.service';
import { Partner } from 'src/app/Models/partner.model';
import { PaymentService } from 'src/app/Core/payment.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-partner-create',
    templateUrl: './partner-create.component.html',
    styleUrls: ['./partner-create.component.css'],
    standalone: false
})
export class PartnerCreateBackOfficeComponent {
    partner: Partner = {
        partnerName: '',
        partnerContactInfo: '',
        partnerCode: 0,
        partnershipDuration: 0
    };
    successMessage: string = '';
    errorMessage: string = '';
    isLoading: boolean = false; // Add this line to define `isLoading`

    constructor(private partnerService: PartnerService, private paymentService: PaymentService, protected router: Router) {} // Inject Router

    createPartner(partnerForm: NgForm) {
        if (partnerForm.invalid) return;

        this.isLoading = true; // Set isLoading to true when starting the creation process
        
        this.partnerService.createPartner(this.partner).subscribe({
            next: (createdPartner: Partner) => {
                this.successMessage = 'Partner created successfully!';
                this.errorMessage = '';
                this.partner = { partnerName: '', partnerContactInfo: '', partnerCode: 0, partnershipDuration: 0 }; // Reset form
                this.isLoading = false; // Set isLoading to false when the process is complete
                this.createPaymentForPartner(createdPartner); // Optionally create payment
            },
            error: (err: any) => {
                this.errorMessage = 'Failed to create partner. Please try again.';
                this.successMessage = '';
                this.isLoading = false; // Reset loading state if there's an error
            }
        });
    }

    createPaymentForPartner(createdPartner: Partner) {
        // Assuming you need to create a payment for this partner, call the PaymentService
        this.paymentService.createPayment({ partnerId: createdPartner.partnerCode }).subscribe({
            next: (paymentResponse: any) => {
                console.log('Payment successfully created for the partner:', paymentResponse);
                // Handle success, maybe show a success message or update UI
            },
            error: (err: any) => {
                console.error('Failed to create payment for partner:', err);
                // Handle payment creation error (Optional: Show an error message or handle logic)
            }
        });
    }
}
