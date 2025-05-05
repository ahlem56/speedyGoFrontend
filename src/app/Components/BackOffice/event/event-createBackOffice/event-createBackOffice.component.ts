import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventService, AppEvent } from '../../../../Core/event.service';

@Component({
  selector: 'app-event-create-back-office',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, RouterModule ],
  templateUrl: 'event-createBackOffice.component.html',
  styleUrls: ['event-createBackOffice.component.css']
})
export class EventCreateBackOfficeComponent {
  eventForm: FormGroup;
  submitted = false;
  serverError: string | null = null;
  photoPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      eventDate: ['', Validators.required],
      eventDescription: ['', [Validators.required, Validators.maxLength(500)]],
      eventLocation: ['', [Validators.required, Validators.maxLength(100)]],
      maxParticipants: [1, [Validators.required, Validators.min(1)]],
      photo: [null]
    });
  }

  get f() {
    return this.eventForm.controls;
  }

  onFileChange(event: Event) {
    // 1) Cast to HTMLInputElement
    const inputEl = event.target as HTMLInputElement;

    // 2) Now check for files
    const fileList = inputEl.files;
    if (!fileList || fileList.length === 0) {
      return;
    }

    // 3) Grab the first File
    const file = fileList.item(0);
    if (!file) {
      return;
    }

    // 4) Read it as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
      this.eventForm.patchValue({ photo: this.photoPreview });
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.submitted = true;
    this.serverError = null;

    if (this.eventForm.invalid) {
      return;
    }

    const newEvent: AppEvent = this.eventForm.value;
    this.eventService.createEvent(newEvent).subscribe({
      next: () => this.router.navigate(['/back-office/events/list']),
      error: err => {
        console.error('CreateEvent error response:', err);
        // If the backend returned { message: "...", timestamp: "..." }
        this.serverError = err.message || err.error?.message || 'Création échouée';
      }
    });
  }
}
