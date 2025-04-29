import { Component } from '@angular/core';
import { PartnerService } from 'src/app/Core/partner.service';
import { Partner } from 'src/app/Models/partner.model';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-partner-create',
    templateUrl: './partner-create.component.html',
    styleUrls: ['./partner-create.component.css'],
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule]
})
export class PartnerCreateBackOfficeComponent {
    partner: Partner = {
        partnerId: 0, // Default value for partnerId
        partnerName: '',
        partnerContactInfo: '',
        partnerCode: 0,
        partnershipDuration: 0,
        commissionRate: 0, // Default value for commissionRate
        totalCommission: 0 // Default value for totalCommission
    };
    successMessage: string = '';
    errorMessage: string = '';
    isLoading: boolean = false; // Add this line to define `isLoading`

    constructor(
        private formBuilder: FormBuilder,
        private partnerService: PartnerService,
        public router: Router,
        private toastr: ToastrService
    ) {}

    createPartner(partnerForm: NgForm) {
        if (partnerForm.invalid) {
            this.errorMessage = 'Please fill in all required fields';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';
        
        this.partnerService.createPartner(this.partner).subscribe({
            next: (createdPartner) => {
                this.successMessage = 'Partner created successfully!';
                this.isLoading = false;
                // Reset form
                this.partner = {
                    partnerId: 0,
                    partnerName: '',
                    partnerContactInfo: '',
                    partnerCode: 0,
                    partnershipDuration: 0,
                    commissionRate: 0,
                    totalCommission: 0
                };
                // Navigate to partner list after a short delay
                setTimeout(() => {
                    this.router.navigate(['/back-office/partners']);
                }, 1500);
            },
            error: (err) => {
                this.errorMessage = err.message || 'Failed to create partner. Please try again.';
                this.isLoading = false;
            }
        });
    }

    cancel() {
        this.router.navigate(['/back-office/partners']);
    }
}
