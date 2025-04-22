// partner-commission.component.ts
import { Component, OnInit } from '@angular/core';
import { CommissionService } from 'src/app/Core/commission.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card'; // Add this import



@Component({
  selector: 'app-partner-commissions',
  templateUrl: './commission.component.html',
  styleUrls: ['./commission.component.css'],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatTableModule
  ],
  providers: [CommissionService]
})
// partner-commission.component.ts
export class PartnerCommissionComponent implements OnInit {
  // ... existing properties ...
  partnerId : number = 0; // Get this from your authentication service
  commissions: any[] = []; // Declare commissions property
  loading: boolean = true; // Initialize loading property
  error: string | null = null; // Declare error property
  summary: any; // Declare summary property

  constructor(private commissionService: CommissionService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('partnerId');
    this.partnerId = storedId ? parseInt(storedId) : 0;
  
    if (!this.partnerId || this.partnerId === 0) {
      this.error = "You are not associated with any partner.";
      this.loading = false;
      return;
    }
  
    this.loadData();
  }
  
  

  private getPartnerId() {
    if (!this.partnerId || this.partnerId === 0) {
      this.error = "You are not associated with any partner.";
      this.loading = false;
      return;
    }
    this.loadData();
  }
  

  loadData(): void {
    if (!this.partnerId) return;

    this.commissionService.getCommissions(this.partnerId).subscribe({
      next: (data: any) => {
        this.commissions = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load commission data';
        this.loading = false;
      }
    });

    this.commissionService.getSummary(this.partnerId).subscribe({
      next: (data: any) => this.summary = data,
      error: () => this.error = 'Failed to load summary'
    });
  }
}