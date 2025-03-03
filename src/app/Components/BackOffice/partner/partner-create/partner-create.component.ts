import { Component } from '@angular/core';
import { PartnerService } from 'src/app/Core/partner.service';
import { Partner } from 'src/app/Models/partner.model';
import { PaymentService } from 'src/app/Core/payment.service';

@Component({
    selector: 'app-partner-create',
    templateUrl: './partner-create.component.html',
    styleUrls: ['./partner-create.component.css'],
    standalone: false
})
export class PartnerCreateBackOfficeComponent {
    partner: Partner = {
        name: '',
        email: '',
        phone: '',
        address: ''
    };
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private partnerService: PartnerService, private paymentService: PaymentService) {}

    createPartner() {
        this.partnerService.createPartner(this.partner).subscribe({
            next: (createdPartner: Partner) => {
                this.successMessage = 'Partner created successfully!';
                this.errorMessage = '';
                this.partner = { name: '', email: '', phone: '', address: '' }; // Reset form
                // Initiate payment creation
               
               
            },
            error: (err: any) => {
                this.errorMessage = 'Failed to create partner. Please try again.';
                this.successMessage = '';
            }
        });
    }
}