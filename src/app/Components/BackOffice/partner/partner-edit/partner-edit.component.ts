import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PartnerService } from 'src/app/Core/partner.service';
import { Partner } from 'src/app/Models/partner.model';
import { HttpClient } from '@angular/common/http';

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
  users: any[] = [];
  selectedUserId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partnerService: PartnerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPartner(+id);
      this.loadUsers();
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

  loadUsers(): void {
    this.http
      .get('http://localhost:8089/examen/simpleuser/all', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .subscribe({
        next: (users: any) => {
          this.users = users;
        },
        error: (err) => {
          console.error('Error loading users:', err);
          this.errorMessage = 'Failed to load users';
        }
      });
  }
  savePartner(): void {
    if (!this.partner.partnerName) {
      this.errorMessage = 'Partner name is required';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.partnerService.updatePartner(this.partner.partnerId, this.partner).subscribe({
      next: () => {
        this.successMessage = 'Partner updated successfully!';
        this.isLoading = false;
        setTimeout(() => this.router.navigate(['/back-office/partners']), 2000);
      },
      error: (err) => {
        console.error('Error updating partner:', err);
        this.errorMessage = err.message || 'Failed to update partner';
        this.isLoading = false;
      }
    });
  }
  
  assignUser(): void {
    if (!this.selectedUserId || !this.partner.partnerId) {
      this.errorMessage = 'Please select a user';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.http
      .post(
        'http://localhost:8089/examen/simpleuser/assign-partner',
        { userId: this.selectedUserId, partnerId: this.partner.partnerId },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .subscribe({
        next: () => {
          this.successMessage = 'User assigned to partner successfully!';
          this.isLoading = false;
          this.selectedUserId = null;
        },
        error: (err) => {
          console.error('Error assigning user:', err);
          this.errorMessage = err.message || 'Failed to assign user';
          this.isLoading = false;
        }
      });
  }
  cancel(): void {
    this.router.navigate(['/back-office/partners']);
  }
}