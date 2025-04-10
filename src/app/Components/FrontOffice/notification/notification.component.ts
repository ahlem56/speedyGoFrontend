// Notification Frontend Component
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Core/notification-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [CommonModule],
})
export class NotificationFrontOfficeComponent implements OnInit, OnDestroy {
  notifications: any[] = [];  // Changed to hold structured data

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.connectToNotifications().subscribe(
      (message: any) => {
        if (message.refused) {
          // Trip refusal notification
          this.notifications.push({
            type: 'refusal',
            departure: message.departure,
            destination: message.destination,
            message: `Your trip from ${message.departure} to ${message.destination} has been refused by the driver. Please try booking another trip.`,
            time: new Date()
          });
        } else if (message.eventDescription) {
          // Event creation notification
          this.notifications.push({
            type: 'event',
            eventDescription: message.eventDescription,
            message: `A new event titled '${message.eventDescription}' has been created!`,
            time: new Date()
          });
        } else if (message.details) {
          // Trip acceptance notification - ACCESS DETAILS OBJECT
          const details = message.details;
          this.notifications.push({
            type: 'acceptance',
            departure: details.departure,
            destination: details.destination,
            price: details.price,
            passengers: details.passengers,
            message: `Your trip from ${details.departure} to ${details.destination} has been confirmed!`,
            time: new Date()
          });
        }
      },
      (error) => {
        console.error('SSE connection error', error);
      }
    );
  }

  

  ngOnDestroy(): void {
    this.notificationService.closeConnection();
  }
}
