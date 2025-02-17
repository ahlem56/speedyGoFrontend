import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/Core/user.service';  // Import the UserService
import { Router } from '@angular/router';  // Import Router

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', [Validators.required]],
      cin: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // Only numbers for CIN
      birthDate: ['', [Validators.required]]
    });
  }

  onSignup(): void {
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
      console.log('Form is not valid');
    }
  }
}
