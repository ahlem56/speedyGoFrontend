import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AppEvent {
  eventId: number;
  eventDate: string;
  eventDescription: string;
  eventLocation: string;
  maxParticipants: number;
  simpleUsers: { userId: number }[];
  photo?: string;
  currentParticipants: number;
  registered: boolean;

}

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'http://localhost:8089/examen/event';
  private eventsSubject = new BehaviorSubject<AppEvent[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialEvents();
  }

  private loadInitialEvents(): void {
    this.http.get<AppEvent[]>(`${this.apiUrl}/getAllEvent`).pipe(
      tap(events => this.eventsSubject.next(events)),
      catchError(this.handleError)
    ).subscribe();
  }

  getAllEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.apiUrl}/getAllEvent`).pipe(
      tap(events => this.eventsSubject.next(events)),
      catchError(this.handleError)
    );
  }



  createEvent(event: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${this.apiUrl}/createEvent`, event).pipe(
      tap(() => this.loadInitialEvents()),
      catchError(this.handleError)
    );
  }

  updateEvent(id: number, event: AppEvent): Observable<AppEvent> {
    return this.http.put<AppEvent>(`${this.apiUrl}/updateEvent/${id}`, event).pipe(
      tap(() => this.loadInitialEvents()),
      catchError(this.handleError)
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteEvent/${id}`).pipe(
      tap(() => this.loadInitialEvents()),
      catchError(this.handleError)
    );
  }

  register(eventId: number, userId: number): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${this.apiUrl}/register/${eventId}/${userId}`, {}).pipe(
      tap(() => this.loadInitialEvents()),
      catchError(this.handleError)
    );
  }

  unregister(eventId: number, userId: number): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${this.apiUrl}/unregister/${eventId}/${userId}`, {}).pipe(
      tap(() => this.loadInitialEvents()),
      catchError(this.handleError)
    );
  }

  getEventById(id: number): Observable<AppEvent> {
    return this.http.get<AppEvent>(`${this.apiUrl}/getEvent/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => error.error?.message || 'Server error');
  }

  joinEvent(eventId: number, userId: number): Observable<AppEvent> {
    return this.register(eventId, userId);
  }

  leaveEvent(eventId: number, userId: number): Observable<AppEvent> {
    return this.unregister(eventId, userId);
  }


  getEventWithMostParticipants(): Observable<AppEvent> {
    return this.http.get<AppEvent>(`${this.apiUrl}/mostParticipants`).pipe(
      catchError(this.handleError)
    );
  }
}
