import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [ReactiveFormsModule],

})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
      // Handle sign-up logic here (e.g., call your authentication service)
    } else {
      console.log('Form is not valid');
    }
  }
}
