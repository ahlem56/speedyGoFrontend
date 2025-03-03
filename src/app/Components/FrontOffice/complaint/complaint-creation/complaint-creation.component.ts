import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/Core/complaint.service';
import { UserService } from 'src/app/Core/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-complaint-create',
  templateUrl: './complaint-creation.component.html',
  styleUrls: ['./complaint-creation.component.css'],
  imports: [FormsModule,ReactiveFormsModule, CommonModule]
})
export class ComplaintCreationFrontOfficeComponent implements OnInit {
  complaint: any = {
    complaintTitle: '',
    complaintDescription: '',
    complaintCategory: '',
    complaintDate: '',
  };
  simpleUserId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';
  complaintDescriptionTouched: boolean = false; // Ajoutez cette variable

  constructor(
    private complaintService: ComplaintService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Retrieve the logged-in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.simpleUserId = currentUser.userId;

    console.log("SimpleUser ID: ", this.simpleUserId);
  }

  createComplaint() {
    if (!this.simpleUserId) {
      this.errorMessage = 'User ID is not available.';
      return;
    }

    // Vérifiez si le champ est vide
    if (!this.complaint.complaintDescription) {
      this.complaintDescriptionTouched = true; // Marquez le champ comme touché
      this.errorMessage = 'Please describe your problem.';
      return;
    }

    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.complaintService.addComplaint(this.complaint, this.simpleUserId, headers).subscribe(
      (createdComplaint) => {
        console.log('Complaint Created', createdComplaint);
        this.successMessage = 'Your complaint has been created successfully!';
        this.errorMessage = '';

        // Reset the form after successful creation
        this.complaint = {
          complaintTitle: '',
          complaintDescription: '',
          complaintCategory: '',
          complaintDate: '',
        };
        this.complaintDescriptionTouched = false; // Réinitialisez l'état du champ
      },
      (error) => {
        // Log the error and display a message
        console.error('Error:', error);
        if (error.status === 401 && !error.error) {
          this.errorMessage = 'An error occurred while creating the complaint.';
        } else {
          this.errorMessage = error.message || 'An error occurred while creating the complaint.';
        }
      }
    );
  }

  goToComplaintList() {
    this.router.navigate(['/complaints/list']);
  }
}