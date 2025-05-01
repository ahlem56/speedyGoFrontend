import { Component, OnInit } from '@angular/core';
import { EventService, AppEvent} from "../../../../Core/event.service";
import {CommonModule, DatePipe} from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-event-list-backoffice',
  templateUrl: 'event-listBackOffice.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  styleUrls: ['event-listBackOffice.component.css']
})
export class EventListBackOfficeComponent implements OnInit {
  events: AppEvent[] = [];
  loading = true;
  error: string | null = null;
  searchQuery = '';

  constructor(
    private eventService: EventService,
    private datePipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    console.log('Initiating events load...');

    this.eventService.getAllEvents().subscribe({
      next: (events) => {
        console.log('Events received:', events);
        this.events = events;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.error = typeof err === 'string' ? err : err.message;
        this.loading = false;
      },
      complete: () => console.log('Events loading complete')
    });
  }

  formatDate(dateString: string): string {
    return this.datePipe.transform(dateString, 'medium') || 'Invalid date';
  }

  deleteEvent(eventId: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(eventId).subscribe({
        next: () => {
          this.events = this.events.filter(event => event.eventId !== eventId);
        },
        error: (err) => {
          this.error = 'Delete failed: ' + err;
        }
      });
    }
  }

  get filteredEvents() {
    return this.events.filter(event =>
      event.eventDescription.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      event.eventLocation.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  navigateToEdit(eventId: number) {
    // Use absolute path with route parameter
    this.router.navigate(['/back-office/events', eventId]);
  }

  navigateToCreate(){
    this.router.navigate(['/back-office/events/create']);
  }
}
