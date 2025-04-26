import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/Core/user.service';  // Import the UserService
import { Router } from '@angular/router';  // Import Router
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports:[ReactiveFormsModule, CommonModule]  // Import ReactiveFormsModule and CommonModule directly here
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    // Initialize the form with validation rules
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Only numbers for CIN
      birthDate: ['', [Validators.required]]
    });
  }

  onSignup(): void {
    // Check if the form is valid
    if (this.signupForm.valid) {
      console.log('Sign up successful', this.signupForm.value);

      // Call signup method in UserService with the whole form data
      this.userService.signup(this.signupForm.value).subscribe(
        (response) => {
          console.log('Signup success:', response);

          // After signup, navigate to the login page
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Signup error:', error);
          alert('Signup failed. Please try again.');
        }
      );
    } else {
      // Show error if form is not valid
      console.log('Form is not valid');
    }
  }

  // Getter methods to make accessing form controls easier
  get firstName() { return this.signupForm.get('firstName'); }
  get lastName() { return this.signupForm.get('lastName'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get address() { return this.signupForm.get('address'); }
  get cin() { return this.signupForm.get('cin'); }
  get birthDate() { return this.signupForm.get('birthDate'); }
}
