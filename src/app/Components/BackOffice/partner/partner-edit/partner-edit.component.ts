// partner-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerService } from 'src/app/Core/partner.service';
import { Partner } from 'src/app/Models/partner.model';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PartnerEditComponent implements OnInit {
  partner: Partner = {} as Partner;
  isLoading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPartner(+id);
    } else {
      this.errorMessage = 'Partner ID is missing';
      this.isLoading = false;
    }
  }

  loadPartner(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.partnerService.getPartnerById(id).subscribe({
      next: (partner) => {
        this.partner = partner;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading partner:', err);
        this.errorMessage = err.message || 'Failed to load partner details';
        this.isLoading = false;
      }
    });
  }

  savePartner(): void {
    if (!this.partner.partnerId) {
      this.errorMessage = 'Invalid partner data';
      return;
    }
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.partnerService.updatePartner(this.partner.partnerId, this.partner).subscribe({
      next: () => {
        this.successMessage = 'Partner updated successfully!';
        this.isLoading = false;
        // Navigate back to partner list after a short delay
        setTimeout(() => {
          this.router.navigate(['/back-office/partners']);
        }, 1500);
      },
      error: (err) => {
        console.error('Error updating partner:', err);
        this.errorMessage = err.message || 'Failed to update partner';
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/back-office/partners']);
  }
}