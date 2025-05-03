import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/Core/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  user: any;
  errorMessage: string = '';
  profileImageUrl: string | ArrayBuffer | null = 'assets/default-profile.png';

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.editProfileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      cin: [''],
      birthDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.editProfileForm.patchValue(this.user);
    }
  }

  triggerFileInput(): void {
    document.getElementById('fileInput')?.click();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => this.profileImageUrl = e.target?.result || this.profileImageUrl;
      reader.readAsDataURL(file);
    }
  }

  /** ✅ Add this function to update profile */
  saveChanges(): void {
    if (this.editProfileForm.valid) {
      const formData = { ...this.editProfileForm.value };
      if (formData.birthDate) {
        const dateObj = new Date(formData.birthDate);
        formData.birthDate = dateObj.toISOString().split('T')[0];
      }
      this.userService.updateUserProfile(formData).subscribe({
        next: (response) => {
          alert(response.message || 'Profile updated successfully!');
          localStorage.setItem('user', JSON.stringify(formData));
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.errorMessage = error.error?.error || 'An unknown error occurred';
        }
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/profile']);
  }
}
