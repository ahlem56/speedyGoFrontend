import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/Core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

  imports: [ReactiveFormsModule]  // Import ReactiveFormsModule directly here
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
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/landingPage']);
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
