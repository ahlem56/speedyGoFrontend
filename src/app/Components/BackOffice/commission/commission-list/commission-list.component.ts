import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommissionService } from 'src/app/Core/commission.service';
import { PartnerService } from 'src/app/Core/partner.service';
import { MockPartnerService } from 'src/app/Core/mock-partner.service';
import { SumPipe } from 'src/app/Pipes/sum.pipe';
import { FilterPipe } from 'src/app/Pipes/filter.pipe';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-commission-list',
  templateUrl: './commission-list.component.html',
  styleUrls: ['./commission-list.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    SumPipe,
    FilterPipe,
    MatOptionModule,
    MatSelectModule
  ]
})
export class CommissionListComponent implements OnInit {
  commissions: any[] = [];
  partners: any[] = [];
  displayedColumns: string[] = ['commissionId', 'partnerName', 'amount', 'calculatedAt', 'paidOut', 'description'];
  isLoading = false;
  isCreating = false;
  commissionForm: FormGroup;

  constructor(
    private commissionService: CommissionService,
    private partnerService: PartnerService,
    private mockPartnerService: MockPartnerService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.commissionForm = this.fb.group({
      partnerId: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.loadPartners();
    this.loadCommissions();
  }

  loadPartners(): void {
    this.isLoading = true;
    console.log('Starting to load partners...');
    
    // Try using the real service first
    this.partnerService.getPartners().subscribe({
      next: (data) => {
        console.log('Partners loaded successfully from real service:', data);
        
        // Ensure data is an array
        if (Array.isArray(data) && data.length > 0) {
          this.partners = data;
          console.log('Partners array updated with', this.partners.length, 'partners');
          
          // Log each partner for debugging
          this.partners.forEach((partner, index) => {
            console.log(`Partner ${index}:`, partner);
          });
        } else {
          console.warn('No partners data received from real service, using mock data');
          this.loadMockPartners();
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading partners from real service:', error);
        console.log('Falling back to mock partners data');
        this.loadMockPartners();
      }
    });
  }
  
  // Helper method to load mock partners
  private loadMockPartners(): void {
    this.mockPartnerService.getPartners().subscribe({
      next: (data) => {
        console.log('Mock partners loaded successfully:', data);
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          this.partners = data;
          console.log('Mock partners array updated with', this.partners.length, 'partners');
          
          // Log each partner for debugging
          this.partners.forEach((partner, index) => {
            console.log(`Mock Partner ${index}:`, partner);
          });
        } else {
          console.warn('Mock partners data is not an array:', data);
          this.partners = [];
        }
        
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading mock partners:', error);
        this.snackBar.open('Error loading partners: ' + error.message, 'Close', { duration: 5000 });
        this.isLoading = false;
        this.partners = [];
      }
    });
  }

  loadCommissions(): void {
    // For admin view, we'll load all commissions
    this.isLoading = true;
    // This is a placeholder - you'll need to implement getAllCommissions in your service
    this.commissionService.getCommissions(0).subscribe({
      next: (data) => {
        console.log('Commissions loaded:', data);
        this.commissions = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading commissions:', error);
        this.snackBar.open('Error loading commissions: ' + error.message, 'Close', { duration: 5000 });
        this.isLoading = false;
      }
    });
  }

  createCommission(): void {
    if (this.commissionForm.valid) {
      this.isCreating = true;
      const { partnerId, amount, description } = this.commissionForm.value;
      
      console.log('Creating commission with values:', { partnerId, amount, description });
      
      this.commissionService.createCommission(partnerId, amount, description).subscribe({
        next: (response) => {
          console.log('Commission created successfully:', response);
          this.snackBar.open('Commission created successfully!', 'Close', { duration: 3000 });
          this.commissionForm.reset();
          this.loadCommissions();
          this.isCreating = false;
        },
        error: (error) => {
          console.error('Error creating commission:', error);
          this.snackBar.open('Error creating commission: ' + error.message, 'Close', { duration: 5000 });
          this.isCreating = false;
        }
      });
    } else {
      console.warn('Form is invalid:', this.commissionForm.errors);
      this.snackBar.open('Please fill in all required fields correctly', 'Close', { duration: 3000 });
    }
  }
} 