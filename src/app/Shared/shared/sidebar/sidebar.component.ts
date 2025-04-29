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
  styleUrls: ['./sidebar.component.scss'],
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
    this.userRole = localStorage.getItem('userRole') || 'SimpleUser';
    console.log('Initial user role:', this.userRole);
    
    // Set menu items based on user role
    this.setMenuItems();
    
    // Listen for changes to localStorage
    window.addEventListener('storage', (event) => {
      if (event.key === 'userRole') {
        this.userRole = event.newValue || 'SimpleUser';
        this.setMenuItems();
      }
    });
  }

  // Set menu items based on user role
  setMenuItems() {
    // Get user role from localStorage
    this.userRole = localStorage.getItem('userRole') || 'SimpleUser';
    console.log('Setting menu items for role:', this.userRole);
    
    // Filter menu items based on user role (case-insensitive)
    if (this.userRole.toUpperCase() === 'ADMIN') {
      // For admin, show all back-office routes
      this.sidebarnavItems = ALL_ROUTES.filter(item => 
        item.path.startsWith('back-office/')
      );
      console.log('Admin menu items:', this.sidebarnavItems);
    } else if (this.userRole.toUpperCase() === 'DRIVER') {
      // For drivers, show driver interface routes
      this.sidebarnavItems = ALL_ROUTES.filter(item => 
        item.path.startsWith('driver-interface/')
      );
    } else if (this.userRole.toUpperCase() === 'PARTNER') {
      // For partners, show front-office routes and partner-specific routes
      this.sidebarnavItems = ALL_ROUTES.filter(item => 
        (!item.path.startsWith('back-office/') && 
         !item.path.startsWith('driver-interface/')) ||
        item.path.startsWith('partner/')
      );
      console.log('Partner menu items:', this.sidebarnavItems);
    } else if (this.userRole.toUpperCase() === 'SIMPLEUSER') {
      // For regular users, show front-office routes
      this.sidebarnavItems = ALL_ROUTES.filter(item => 
        !item.path.startsWith('back-office/') && 
        !item.path.startsWith('driver-interface/') &&
        !item.path.startsWith('partner/')
      );
    } else {
      // Default case
      this.sidebarnavItems = [];
    }
    
    console.log('User role:', this.userRole);
    console.log('Menu items:', this.sidebarnavItems);
  }

  // Handle sidebar item click and check for login
  handleSidebarItemClick(path: string) {
    const isLoggedIn = localStorage.getItem('authToken'); // Check if token exists

    if (!isLoggedIn) {
      // If user is not logged in, show the modal
      this.showModal = true;
    } else {
      // If logged in, navigate to the clicked route
      console.log('Navigating to:', path);
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
