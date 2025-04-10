import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastNotificationComponent } from '../Shared/toast-notification/toast-notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private sseEmitter: EventSource | null = null;
  private toastSubject = new Subject<string>(); // Will emit toast messages
  private newNotificationSubject = new Subject<boolean>();

  constructor() {}
  public emitNewNotification(isNew: boolean) {
    this.newNotificationSubject.next(isNew);
  }
  // Connect to the SSE notifications
  // Notification Service
  public connectToNotifications(): Observable<any> {
    return new Observable<any>((observer) => {
      this.sseEmitter = new EventSource('http://localhost:8089/examen/notifications/stream');
  
      this.sseEmitter.onmessage = (event) => {
        if (event.data === 'Connected to SSE stream.') {
          return;
        }
  
        try {
          const messageData = JSON.parse(event.data);
          this.emitNewNotification(true);
  
          // Handle trip refusal notification
          if (messageData.refused) {
            this.toastSubject.next(
              `Your trip from ${messageData.departure} to ${messageData.destination} has been refused.`
            );
          }
          // Handle event creation notification
          else if (messageData.eventDescription) {
            this.toastSubject.next(
              `New event: ${messageData.eventDescription}`
            );
          }
          // Handle confirmed trip notification (now checking details)
          else if (messageData.details) {
            const details = messageData.details;
            this.toastSubject.next(
              `Your trip from ${details.departure} to ${details.destination} has been confirmed! ` +
              `Departure: ${details.departure}, Price: ${details.price} TND, ` +
              `Passengers: ${details.passengers}`
            );
          }
  
          observer.next(messageData);
        } catch (e) {
          console.error('Error parsing message:', e, event.data);
        }
      };

    this.sseEmitter.onerror = (error) => {
      observer.error(error);
    };

    this.sseEmitter.onopen = () => {
      console.log('Connection opened');
    };
  });
}

public getNewNotificationStatus(): Observable<boolean> {
  return this.newNotificationSubject.asObservable();
}

  // Method to subscribe to toast messages
  public getToastMessages(): Observable<string> {
    return this.toastSubject.asObservable();
  }

  // Close the SSE connection
  public closeConnection() {
    if (this.sseEmitter) {
      this.sseEmitter.close();
    }
  }


  
}
