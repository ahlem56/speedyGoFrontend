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
  imports:[CommonModule, FormsModule, RouterModule]
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
        this.partners = partners;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Full error:', err);
        this.errorMessage = 'Failed to load partners. Please check the console for details.';
        this.isLoading = false;
      }
    });
  }
  applyFilter(): void {
    this.filteredPartners = this.partners.filter(partner => {
      const searchLower = this.searchTerm.toLowerCase();
      return (
        (partner.partnerName?.toLowerCase().includes(searchLower)) ||
        (partner.partnerCode?.toString().includes(this.searchTerm))
      );
    });
    this.totalItems = this.filteredPartners.length;
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
          console.error('Delete error:', err);
          this.errorMessage = `Failed to delete partner. Error: ${err.status} ${err.statusText}`;
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

  get paginatedPartners(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredPartners.slice(startIndex, startIndex + this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
