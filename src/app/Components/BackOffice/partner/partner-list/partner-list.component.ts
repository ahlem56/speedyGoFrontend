import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/Core/partner.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Partner } from '../../../../Models/partner.model';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PartnerListBackOfficeComponent implements OnInit {
  partners: Partner[] = [];
  filteredPartners: Partner[] = [];
  isLoading = true;
  searchTerm = '';
  errorMessage = '';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  constructor(
    private partnerService: PartnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPartners();
  }

  loadPartners(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.partnerService.getPartners().subscribe({
      next: (partners: Partner[]) => {
        console.log('Partners received:', partners);
        
        if (!partners || partners.length === 0) {
          this.errorMessage = 'No partners found in the database.';
          this.partners = [];
          this.filteredPartners = [];
        } else {
          this.partners = partners;
          this.applyFilter();
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading partners:', err);
        this.errorMessage = err.message || 'Failed to load partners. Please check if the backend server is running.';
        this.isLoading = false;
      }
    });
  }
  
  applyFilter(): void {
    if (!this.searchTerm.trim()) {
      this.filteredPartners = this.partners;
    } else {
      const searchLower = this.searchTerm.toLowerCase();
      this.filteredPartners = this.partners.filter(partner => 
        partner.partnerName?.toLowerCase().includes(searchLower) ||
        partner.partnerCode?.toString().includes(this.searchTerm) ||
        partner.partnerContactInfo?.toLowerCase().includes(searchLower)
      );
    }
    this.totalItems = this.filteredPartners.length;
    this.currentPage = 1; // Reset to first page when filtering
  }

  deletePartner(partnerId: number): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.isLoading = true;
      this.errorMessage = '';
      
      this.partnerService.deletePartner(partnerId).subscribe({
        next: () => {
          this.partners = this.partners.filter(p => p.partnerId !== partnerId);
          this.applyFilter();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error deleting partner:', err);
          this.errorMessage = err.message || 'Failed to delete partner';
          this.isLoading = false;
        }
      });
    }
  }

  editPartner(partnerId: number): void {
    this.router.navigate(['/back-office/partners/edit', partnerId]);
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedPartners(): Partner[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPartners.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
