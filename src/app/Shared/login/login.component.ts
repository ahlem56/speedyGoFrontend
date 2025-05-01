import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Core/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]  // Import ReactiveFormsModule directly here
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.userService.login(email, password).subscribe(
        (response) => {
          // Store auth token and user role
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.role);
          localStorage.setItem('user', JSON.stringify(response.user));

          // Redirect based on user role (case-insensitive comparison)
          const role = response.role.toLowerCase();
          if (role === 'admin') {
            this.router.navigate(['back-office/dashboard']);
          } else if (role === 'driver') {
            this.router.navigate(['driver-interface/trips']);
          } else if (role === 'partner') {
            this.router.navigate(['partner/commissions']);
          } else {
            this.router.navigate(['landingPage']); // Default route if no specific role
          }
        },
        (error) => {
          console.error('Login error:', error);
          alert('Invalid email or password!');
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }
}
