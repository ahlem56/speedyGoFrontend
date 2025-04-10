import { Component } from '@angular/core';
import { NotificationService } from './Core/notification-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {
  title = 'speedyGoFrontend';
  notifications: string[] = [];  // Declare the notifications array

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Subscribe to toast messages
    this.notificationService.getToastMessages().subscribe((message: string) => {
      this.notifications.push(message);  // Add the new message to notifications
    });

    // Connect to notifications stream
    this.notificationService.connectToNotifications().subscribe();
  }
}
