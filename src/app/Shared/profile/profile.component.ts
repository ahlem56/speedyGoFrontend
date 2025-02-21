import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule]  // Import CommonModule directly here
})
export class ProfileComponent implements OnInit {
  user: any = {};  // Store the user data
  defaultProfilePhoto: string = 'assets/FrontOffice/images/users/default.jpg';  // Default image path

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);  // Parse and load user data from localStorage
    }
  }

  // Return a valid image URL or the default if none exists
  getProfileImage() {
    return this.user.userProfilePhoto ? `assets/FrontOffice/images/users/${this.user.userProfilePhoto}.jpg` : this.defaultProfilePhoto;
  }
}
