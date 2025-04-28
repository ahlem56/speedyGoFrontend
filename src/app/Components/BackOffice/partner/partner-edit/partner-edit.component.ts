// partner-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerService } from 'src/app/Core/partner.service';
import { Partner } from 'src/app/Models/partner.model';

@Component({
  selector: 'app-partner-edit',
  templateUrl: './partner-edit.component.html',
  styleUrls: ['./partner-edit.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PartnerEditComponent implements OnInit {
  partner: Partner = {} as Partner;
  isLoading = true;
  errorMessage = '';

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
    this.partnerService.getPartnerById(id).subscribe({
      next: (partner) => {
        this.partner = partner;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading partner:', err);
        this.errorMessage = 'Failed to load partner details';
        this.isLoading = false;
      }
    });
  }

  savePartner(): void {
    this.isLoading = true;
    this.partnerService.updatePartner(this.partner.partnerId, this.partner).subscribe({
      next: () => {
        this.router.navigate(['/back-office/partners']);
      },
      error: (err) => {
        console.error('Error updating partner:', err);
        this.errorMessage = 'Failed to update partner';
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/back-office/partners']);
  }
}