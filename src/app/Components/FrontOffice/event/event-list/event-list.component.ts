// src/app/FrontOffice/event-listFrontOffice.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, AppEvent } from 'src/app/Core/event.service';

@Component({
  selector: 'app-event-list-front',
  templateUrl: 'event-list.component.html',
  styleUrls: ['event-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class EventListFrontOfficeComponent implements OnInit {
  events: AppEvent[] = [];
  loading = true;
  error: string | null = null;
  private userId!: number;

  constructor(
    private eventService: EventService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.userId;
    this.loadEvents();
  }

  private loadEvents(): void {
    this.loading = true;
    this.eventService.getAllEvents().subscribe({
      next: evts => {
        this.events = evts.map(e => ({
          ...e,
          currentParticipants: e.simpleUsers?.length ?? 0,
          registered: e.simpleUsers?.some(u => u.userId === this.userId) ?? false
        }));
        this.loading = false;
      },
      error: err => {
        this.error = typeof err === 'string' ? err : err.message;
        this.loading = false;
      }
    });
  }

  formatDate(dateStr: string): string {
    return this.datePipe.transform(dateStr, 'medium') || dateStr;
  }

  join(evt: AppEvent): void {
    this.eventService.register(evt.eventId, this.userId).subscribe({
      next: () => {
        evt.registered = true;
        evt.currentParticipants = (evt.currentParticipants ?? 0) + 1;
      },
      error: err => this.error = err.error?.message || err.message
    });
  }

  leave(evt: AppEvent): void {
    if (confirm("Are you sure you want to leave this event?")) {
      this.eventService.unregister(evt.eventId, this.userId).subscribe({
        next: () => {
          evt.registered = false;
          evt.currentParticipants = Math.max((evt.currentParticipants ?? 1) - 1, 0);
          alert('You have successfully left the event.');
        },
        error: err => this.error = err.error?.message || err.message
      });
    }
  }

}
