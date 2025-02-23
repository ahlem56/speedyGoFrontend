import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  token: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
    this.token = this.route.snapshot.paramMap.get('token') as string;

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.get('newPassword')?.value;
      const resetData = { token: this.token, newPassword: newPassword };
      
      this.http.post('http://localhost:8089/examen/user/reset-password', resetData)
        .subscribe(
          (response) => {
            console.log('Password successfully reset');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error resetting password', error);
          }
        );
    }
  }
}
