import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EventService ,AppEvent} from "../../../../Core/event.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
    selector: 'app-event-detail',
    templateUrl: './event-detailBackOffice.component.html',
    styleUrls: ['./event-detailBackOffice.component.css'],
    standalone: false
    
})
export class EventDetailBackOfficeComponent {
  eventForm: FormGroup;
  eventId!: number;
  loading = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private route: ActivatedRoute,
    protected router: Router,
    private datePipe: DatePipe
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

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      this.loadEvent();
    });
  }

  loadEvent(): void {
    this.eventService.getEventById(this.eventId).subscribe({
      next: (event) => {
        const formattedDate = this.datePipe.transform(
          event.eventDate,
          'yyyy-MM-ddTHH:mm'
        );

        this.eventForm.patchValue({
          ...event,
          eventDate: formattedDate
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading event: ' + err;
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const updatedEvent: AppEvent = {
        ...this.eventForm.value,
        eventId: this.eventId,
        eventDate: new Date(this.eventForm.value.eventDate).toISOString()
      };

      this.eventService.updateEvent(this.eventId, updatedEvent).subscribe({
        next: () => this.router.navigate(['/back-office/events/list']),
        error: (err) => this.errorMessage = 'Error updating event: ' + err
      });
    }
  }
}
