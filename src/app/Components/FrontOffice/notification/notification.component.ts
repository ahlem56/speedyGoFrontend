import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Core/notification-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [CommonModule],
})
export class NotificationFrontOfficeComponent implements OnInit, OnDestroy {
  notifications: any[] = [];

  constructor(
    private notificationService: NotificationService,
    private http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.userId;

    // Load stored notifications first
    try {
      const storedNotifications = await this.notificationService
        .getStoredNotifications(userId)
        .toPromise();
      
      if (storedNotifications) { // Add this null check
        this.notifications = storedNotifications.map(notification => {
          try {
            const content = JSON.parse(notification.notificationContent);
            return this.mapNotification(content);
          } catch (e) {
            console.error('Error parsing notification content', e);
            return null;
          }
        }).filter(n => n !== null) as any[]; // Explicit type assertion
      }
    } catch (error) {
      console.error('Error loading stored notifications', error);
    }

    // Then subscribe to new notifications
    this.notificationService.connectToNotifications(userId).subscribe(
      (message: any) => {
        const newNotification = this.mapNotification(message);
        if (newNotification) {
          this.notifications.unshift(newNotification);
        }
        else if (message.parcelStatus) {
          this.notifications.push({
            type: 'parcel',
            parcelId: message.parcelId,
            status: message.parcelStatus,
            message: `Your parcel #${message.parcelId} is now marked as '${message.parcelStatus}'.`,
            time: new Date()
          });
        }
        
      },
      (error) => {
        console.error('SSE connection error', error);
      }
    );
  }

  private mapNotification(message: any): any {
    if (!message) return null;

    if (message.refused) {
      return {
        type: 'refusal',
        departure: message.departure,
        destination: message.destination,
        message: `Your trip from ${message.departure} to ${message.destination} has been refused.`,
        time: new Date(message.timestamp || Date.now())
      };
    } else if (message.eventDescription) {
      return {
        type: 'event',
        eventDescription: message.eventDescription,
        message: `A new event titled '${message.eventDescription}' has been created!`,
        time: new Date(message.timestamp || Date.now())
      };
    } else if (message.details) {
      const details = message.details;
      return {
        type: 'acceptance',
        departure: details.departure,
        destination: details.destination,
        price: details.price,
        passengers: details.passengers,
        message: `Your trip from ${details.departure} to ${details.destination} has been confirmed!`,
        time: new Date(message.timestamp || Date.now())
      };
    }
    return null;
  }

  ngOnDestroy(): void {
    this.notificationService.closeConnection();
  }
}