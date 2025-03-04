// event.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AppEvent {
  eventId?: number;
  eventDate: string;
  eventDescription: string;
  eventLocation: string;
  simpleUsers?: any[];
}

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'http://localhost:8089/examen/event';

  constructor(private http: HttpClient) { }

  createEvent(event: AppEvent) {
    return this.http.post<AppEvent>(`${this.apiUrl}/createEvent`, event).pipe(
      catchError(error => {
        // Handle different error formats
        const serverMessage = error.error?.message ||
          error.error?.error ||
          'Server connection failed';
        return throwError(() => serverMessage);
      })
    );
  }

  getAllEvents() {
    return this.http.get<Event[]>(`${this.apiUrl}/getAllEvent`).pipe(
      catchError(error => {
        return throwError(() => error.error?.message || 'Error fetching events');
      })
    );
  }
  // Update event
  updateEvent(id: number, event: AppEvent) {
    return this.http.put<Event>(`${this.apiUrl}/updateEvent/${id}`, event).pipe(
      catchError(error => {
        return throwError(() => error.error?.message || 'Error updating event');
      })
    );
  }

  // Delete event
  deleteEvent(id: number) {
    return this.http.delete(`${this.apiUrl}/deleteEvent/${id}`).pipe(
      catchError(error => {
        return throwError(() => error.error?.message || 'Error deleting event');
      })
    );
  }
  getEventById(id: number) {
    return this.http.get<AppEvent>(`${this.apiUrl}/getEvent/${id}`).pipe(
      catchError(error => {
        return throwError(() => error.error?.message || 'Error fetching event');
      })
    );
  }
}
