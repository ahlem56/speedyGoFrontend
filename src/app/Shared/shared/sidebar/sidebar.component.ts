import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteInfo } from './sidebar.metadata';
import { UserService } from 'src/app/Core/user.service'; // Import UserService to access logged-in user's role
import { RouterModule } from '@angular/router';  // Import RouterModule
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ALL_ROUTES } from './menu-items';
import { LoginPopupComponent } from '../../login-popup/login-popup.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,  // If you're using standalone component
  imports: [CommonModule, RouterModule, LoginPopupComponent]  // Import the modal component
})
export class SidebarComponent implements OnInit {
  showMenu = '';
  public sidebarnavItems: RouteInfo[] = []; // Empty initially
  public userRole: string = ''; // To store the logged-in user's role
  public showModal: boolean = false; // To control the modal visibility

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Get user role from localStorage
    this.userRole = localStorage.getItem('userRole') || 'SimpleUser';  // Default to 'SimpleUser' if not available
    this.setMenuItems();
  }

  // Set menu items based on user role
  setMenuItems() {
    switch (this.userRole) {
      case 'Admin':
        this.sidebarnavItems = ALL_ROUTES.filter((sidebarnavItem: RouteInfo) =>
          sidebarnavItem.path === 'back-office/dashboard' ||
          sidebarnavItem.path === 'back-office/drivers' ||
          sidebarnavItem.path === 'back-office/vehicles' ||
          sidebarnavItem.path === 'back-office/users' ||
          sidebarnavItem.path === 'back-office/trips' ||
          sidebarnavItem.path === 'back-office/carpool/list' ||
          sidebarnavItem.path === 'back-office/parcels' ||
          sidebarnavItem.path === 'back-office/complaints' ||
          sidebarnavItem.path === 'back-office/events/create' ||
          sidebarnavItem.path === 'back-office/subscriptions' 
        );
        break;
      case 'Driver':
        this.sidebarnavItems = ALL_ROUTES.filter((sidebarnavItem: RouteInfo) =>
          sidebarnavItem.path === 'driver-interface/trips' ||
          sidebarnavItem.path === 'driver-interface/parcels' ||
          sidebarnavItem.path === 'driver-interface/schedule' // For driver-specific routes
        );
        break;
      case 'SimpleUser':
        this.sidebarnavItems = ALL_ROUTES.filter((sidebarnavItem: RouteInfo) =>
          sidebarnavItem.path === 'trips/create' ||
          sidebarnavItem.path === 'carpooling/create' ||
          sidebarnavItem.path === 'parcels/create' ||
          sidebarnavItem.path === 'events' ||
          sidebarnavItem.path === '/subscriptions/create' ||
          sidebarnavItem.path === 'complaints/create' ||
          sidebarnavItem.path === '/about'
        );
        break;
      default:
        this.sidebarnavItems = [];
        break;
    }
  }

  // Handle sidebar item click and check for login
  handleSidebarItemClick(path: string) {
    const isLoggedIn = localStorage.getItem('authToken'); // Check if token exists
    
    if (!isLoggedIn) {
      // If user is not logged in, show the modal
      this.showModal = true;
    } else {
      // If logged in, navigate to the clicked route
      this.router.navigate([path]);
    }
  }

  // Toggle menu items
  addExpandClass(element: string) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  // Close the modal (if needed)
  closeModal() {
    this.showModal = false;
  }
}
