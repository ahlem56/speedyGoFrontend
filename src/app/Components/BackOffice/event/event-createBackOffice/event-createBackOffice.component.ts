import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Event as AppEvent} from "@angular/router";
import {EventService} from "../../../../Core/event.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
    selector: 'app-event-create',
    templateUrl: './event-createBackOffice.component.html',
    styleUrls: ['./event-createBackOffice.component.css'],
    standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule // Import ReactiveFormsModule here
  ],
})
export class EventCreateBackOfficeComponent {
  eventForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      eventDate: ['', [Validators.required]],
      eventDescription: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(1000)
      ]],
      eventLocation: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(200)
      ]]
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;

      // Create UTC date in correct format
      const eventDate = new Date(formValue.eventDate);
      const utcDate = new Date(Date.UTC(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        eventDate.getHours(),
        eventDate.getMinutes()
      ));

      const eventData: { eventLocation: any; eventDescription: any; eventDate: string } = {
        eventDate: utcDate.toISOString(),
        eventDescription: formValue.eventDescription,
        eventLocation: formValue.eventLocation
      };

      this.eventService.createEvent(eventData).subscribe({
        next: () => this.router.navigate(['/back-office/events/list']),
        error: (err) => {
          console.error('Full error:', err);
          this.errorMessage = typeof err === 'string' ? err :
            err.message || 'Unknown error occurred';
        }
      });
    }
  }
}
