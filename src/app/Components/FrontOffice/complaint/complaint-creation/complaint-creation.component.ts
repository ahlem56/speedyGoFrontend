import { Component, OnInit } from '@angular/core';
import { ComplaintService } from 'src/app/Core/complaint.service';
import { UserService } from 'src/app/Core/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-complaint-create',
  templateUrl: './complaint-creation.component.html',
  styleUrls: ['./complaint-creation.component.css'],
  imports: [FormsModule, CommonModule]
})
export class ComplaintCreationFrontOfficeComponent implements OnInit {
  complaint: any = {
    complaintDescription: null,
  };
  simpleUserId: number | null = null;
  errorMessage: string = '';
  successMessage: string = '';

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
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    this.complaintService.addComplaint(this.complaint, this.simpleUserId, headers).subscribe(
      (createdComplaint) => {
        console.log('Complaint Created', createdComplaint);
        this.successMessage = 'Your complaint has been created successfully!';
        this.errorMessage = '';
  
        // Reset the form after successful creation
        this.complaint = {
          complaintDescription: '',
        };
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
