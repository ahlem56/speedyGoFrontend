import { DatePipe } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Core/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports:[DatePipe]
})
export class ProfileComponent implements OnInit {
  user: any = {};  // Store the user data
  defaultProfilePhoto: string = 'assets/FrontOffice/images/users/default.jpg';  // Default image path
  profileImageUrl: string = '';  // To store the profile image URL after upload

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Parse and load user data from localStorage
      this.profileImageUrl = this.getProfileImage();  // Load profile image URL
    }
  }

  // Return a valid image URL or the default if none exists
  getProfileImage() {
    return this.user.userProfilePhoto
      ? `assets/FrontOffice/images/users/${this.user.userProfilePhoto}`
      : this.defaultProfilePhoto;
  }

  // Trigger the hidden file input
  triggerFileInput() {
    document.getElementById('fileInput')?.click();
  }

  // Handle the file change and upload the image
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadProfileImage(file); // Call the actual upload function
    }
  }

  // Actual method to upload the profile image to the server
  uploadProfileImage(file: File) {
    const formData = new FormData();
    formData.append('profilePhoto', file, file.name);
  
    // Get the token from localStorage
    const token = localStorage.getItem('authToken');
  
    // Make sure the token is available
    if (!token) {
      console.error('User is not authenticated.');
      return;
    }
  
    // Set the Authorization header
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Call the backend API to upload the image with Authorization header
    this.userService.uploadProfileImage(formData, headers).subscribe(
      (response) => {
        this.user.userProfilePhoto = response.fileName;
        localStorage.setItem('user', JSON.stringify(this.user));  // Update localStorage with the new user object
        this.profileImageUrl = this.getProfileImage();  // Update the profile image URL
      },
      (error) => {
        console.error('Error uploading profile photo:', error);
      }
    );
  }
  
  
}
