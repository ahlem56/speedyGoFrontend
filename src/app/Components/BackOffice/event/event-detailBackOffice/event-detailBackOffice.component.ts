// src/app/BackOffice/event-detailBackOffice.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService, AppEvent } from 'src/app/Core/event.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detailBackOffice.component.html',
  styleUrls: ['./event-detailBackOffice.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EventDetailBackOfficeComponent implements OnInit {
  eventForm: FormGroup;
  eventId!: number;
  loading = true;
  submitting = false;
  error: string | null = null;
  photoPreview: string | null = null;
  private existingParticipants: { userId: number }[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    protected router: Router,
    private eventService: EventService,
    private datePipe: DatePipe
  ) {
    this.eventForm = this.fb.group({
      eventDate:   ['', [Validators.required]],
      eventDescription: ['', [Validators.required, Validators.maxLength(500)]],
      eventLocation:    ['', [Validators.required, Validators.maxLength(100)]],
      maxParticipants:  [1,  [Validators.required, Validators.min(1)]],
      photo:            [null]
    });
  }

  ngOnInit(): void {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEventDetails();
  }

  private loadEventDetails(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: event => {
        const formattedDate = this.datePipe.transform(
          new Date(event.eventDate),
          'yyyy-MM-ddTHH:mm'
        )!;
        this.eventForm.patchValue({
          eventDate: formattedDate,
          eventDescription: event.eventDescription,
          eventLocation:    event.eventLocation,
          maxParticipants:  event.maxParticipants,
          photo:            event.photo
        });
        this.existingParticipants = event.simpleUsers ?? [];
        if (event.photo) {
          this.photoPreview = event.photo;
        }
        this.loading = false;
      },
      error: err => {
        this.error = err?.message || 'Échec du chargement';
        this.loading = false;
      }
    });
  }

  get f() {
    return this.eventForm.controls as { [key: string]: any };
  }

  onFileChange(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.photoPreview = reader.result as string;
      this.eventForm.patchValue({ photo: this.photoPreview });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.eventForm.invalid) return;
    this.submitting = true;
    this.error = null;

    const vals = this.eventForm.value;
    const updatedEvent: AppEvent = {
      eventId:          this.eventId,
      eventDate:        vals.eventDate,
      eventDescription: vals.eventDescription,
      eventLocation:    vals.eventLocation,
      maxParticipants:  vals.maxParticipants,
      photo:            vals.photo,
      simpleUsers:      this.existingParticipants,
      currentParticipants: this.existingParticipants.length,
      registered:       this.existingParticipants.some(u => u.userId === /* current user? */ 0)
    };

    this.eventService.updateEvent(this.eventId, updatedEvent)
      .pipe(
        catchError(err => {
          this.error = err?.message || 'Échec de la mise à jour';
          return of(null);
        }),
        finalize(() => this.submitting = false)
      )
      .subscribe(() => {
        if (!this.error) {
          this.router.navigate(['/back-office/events/list']);
        }
      });
  }
}
