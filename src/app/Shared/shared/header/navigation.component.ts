import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';  
import { UserService } from 'src/app/Core/user.service';
import { filter } from 'rxjs/operators';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/Core/notification-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl:'./navigation.component.css',
  imports: [CommonModule, RouterModule, NgbDropdownModule],
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public isLoggedIn: boolean = false;
  public username: string = '';
  public profileImageUrl: string = 'assets/FrontOffice/images/users/user4.jpg'; // Default profile picture
  public hasNewNotification: boolean = false; // Add this property to track new notifications

  constructor(private userService: UserService, private router: Router,   
     private notificationService: NotificationService // Inject the service
  ) {}

  ngOnInit() {
    this.checkLoginStatus();  // Check login status when the component is initialized

    // Re-check login status on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Only listen for NavigationEnd events
    ).subscribe(() => {
      this.checkLoginStatus();  // Re-check login status whenever the route changes
    });

    this.notificationService.getNewNotificationStatus().subscribe((isNew) => {
      this.hasNewNotification = isNew;
    });
    // ✅ Listen for profile picture updates
    document.addEventListener('updateProfileImage', () => {
      this.updateProfileImage();
    });
  }

  // ✅ Fetch User Data and Update Profile Picture
  checkLoginStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        this.username = `${user.firstName} ${user.lastName}`;
        this.profileImageUrl = user.userProfilePhoto
          ? `http://localhost:8089/examen/user/profile-photo/${user.userProfilePhoto}`
          : 'assets/FrontOffice/images/users/user4.jpg';
      }
    } else {
      this.isLoggedIn = false;
      this.username = '';
      this.profileImageUrl = 'assets/FrontOffice/images/users/user4.jpg'; // Reset to default
    }
  }

  // ✅ Update Profile Picture When User Uploads New One
  updateProfileImage() {
    const updatedUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.profileImageUrl = updatedUser.userProfilePhoto
      ? `http://localhost:8089/examen/user/profile-photo/${updatedUser.userProfilePhoto}`
      : 'assets/FrontOffice/images/users/user4.jpg';
  }

  // ✅ Logout Method
  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
    this.username = '';
    this.profileImageUrl = 'assets/FrontOffice/images/users/user4.jpg'; // Reset on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}
