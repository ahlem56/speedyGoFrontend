import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';  
import { UserService } from 'src/app/Core/user.service';
import { filter } from 'rxjs/operators';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  imports: [CommonModule, RouterModule, NgbDropdownModule],
})
export class NavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public isLoggedIn: boolean = false;
  public username: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.checkLoginStatus();  // Check login status when the component is initialized

    // Re-check login status on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)  // Only listen for NavigationEnd events
    ).subscribe(() => {
      this.checkLoginStatus();  // Re-check login status whenever the route changes
    });
  }

  // Check if user is logged in
  checkLoginStatus() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.isLoggedIn = true;
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        this.username = `${user.firstName} ${user.lastName}`;  // Set full name
      }
    } else {
      this.isLoggedIn = false;
      this.username = '';
    }
  }
  

  // Logout method
  logout() {
    this.userService.logout();
    this.isLoggedIn = false;
    this.username = '';
    localStorage.removeItem('authToken');  // Remove the authToken from localStorage on logout
    localStorage.removeItem('userRole');  // Remove the userRole from localStorage on logout
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
