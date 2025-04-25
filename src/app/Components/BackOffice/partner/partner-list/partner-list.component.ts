import { Component, OnInit } from '@angular/core';
import { PartnerService } from 'src/app/Core/partner.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.css'],
  imports:[CommonModule, FormsModule, RouterModule]
})
export class PartnerListBackOfficeComponent implements OnInit {
  partners: any[] = [];  // Use 'any[]' to avoid the model
  filteredPartners: any[] = [];
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
    this.partnerService.getPartners().subscribe({
      next: (data: any[]) => {  // Treat the response as 'any[]' here
        this.partners = data;
        this.applyFilter();
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load partners. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    this.filteredPartners = this.partners.filter(partner =>
      partner.partnerName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      partner.partnerCode?.toString().includes(this.searchTerm)
    );
    this.totalItems = this.filteredPartners.length;
    this.currentPage = 1;
  }

  deletePartner(partnerId: number): void {
    if (confirm('Are you sure you want to delete this partner?')) {
      this.partnerService.deletePartner(partnerId).subscribe({
        next: () => {
          this.partners = this.partners.filter(p => p.id !== partnerId);
          this.applyFilter();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete partner. Please try again.';
        }
      });
    }
  }

  editPartner(partnerId: number): void {
    this.router.navigate(['/backoffice/partners/edit', partnerId]);
  }

  // Pagination properties
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
