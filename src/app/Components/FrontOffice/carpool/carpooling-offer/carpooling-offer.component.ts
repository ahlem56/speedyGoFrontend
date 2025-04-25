import { Component, OnInit } from '@angular/core';
import { CarpoolService } from 'src/app/Core/carpool.service';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/Core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carpooling-offer',
  templateUrl: './carpooling-offer.component.html',
  styleUrls: ['./carpooling-offer.component.scss']
})
export class CarpoolingOfferFrontOfficeComponent implements OnInit {
  userId: number | null = null; // ID of the logged-in user
  carpools: any[] = []; // List of carpools
  editingCarpoolId: number | null = null; // ID of the carpool being edited
  updatedCarpool: any = {}; // Object to store carpool updates
  showPastCarpools: boolean = false; // Toggle to show past carpools
  filteredCarpools: any[] = []; // Filtered list of carpools
  usersWhoJoined: any[] = []; // List of users who joined with numberOfPlaces
  getUsersCarpoolId: number | null = null; // ID of the carpool for which users are displayed
  noUsersMessage: string = ''; // Message when no users have joined
  isLoading: boolean = false; // Loading state for users list

  constructor(
    private carpoolService: CarpoolService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Retrieve the logged-in user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = currentUser.userId;

    if (this.userId) {
      this.loadCarpools(); // Load carpools if userId is available
    } else {
      console.error("No logged-in user found.");
      this.router.navigate(['/login']); // Redirect to login page
    }
  }

  // Filter carpools based on past or upcoming status
  filterCarpools(): void {
    const today = new Date();
    console.log("Today's date:", today);

    this.filteredCarpools = this.carpools.filter(carpool => {
      const carpoolDate = new Date(carpool.carpoolDate);
      console.log(`Comparing: ${carpoolDate} >= ${today} ?`, carpoolDate >= today);
      return this.showPastCarpools ? carpoolDate < today : carpoolDate >= today;
    });

    console.log("Filtered carpools:", this.filteredCarpools);
  }

  // Load carpools for the user
  loadCarpools(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.carpoolService.getCarpoolsByUser(this.userId!, headers).subscribe({
      next: (data) => {
        this.carpools = data;
        console.log("Retrieved carpools:", this.carpools);
        this.filterCarpools(); // Apply filter after loading data
      },
      error: (err) => {
        console.error("Error loading carpools:", err);
      }
    });
  }

  // Toggle between past and upcoming carpools
  togglePastCarpools(): void {
    this.showPastCarpools = !this.showPastCarpools;
    this.filterCarpools();
  }

  // Start editing a carpool
  startEditing(carpoolId: number): void {
    this.editingCarpoolId = carpoolId;
    const carpool = this.carpools.find(c => c.carpoolId === carpoolId);
    if (carpool) {
      this.updatedCarpool = { ...carpool };
      this.loadUsersWhoJoined(carpoolId);
    }
  }

  // Load users who joined a carpool
  getUsers(carpoolId: number): void {
    this.getUsersCarpoolId = carpoolId;
    const carpool = this.carpools.find(c => c.carpoolId === carpoolId);
    if (carpool) {
      this.loadUsersWhoJoined(carpoolId);
    }
  }

  // Cancel editing
  cancelEditing(): void {
    this.editingCarpoolId = null;
    this.updatedCarpool = {};
  }

  // Update form fields
  updateField(field: string, event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.updatedCarpool[field] = value;
  }

  // Update a carpool
  updateCarpool(carpoolId: number, updatedCarpool: any): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No authentication token found.");
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    if (this.usersWhoJoined.length > 0) {
      alert("You cannot update this carpool because users have already joined.");
      return;
    }

    console.log("Data sent:", updatedCarpool);

    this.carpoolService.updateCarpool(carpoolId, this.userId!, updatedCarpool, headers).subscribe({
      next: () => {
        console.log("Carpool updated successfully!");
        this.editingCarpoolId = null;
        this.loadCarpools();
      },
      error: (err) => {
        if (err.status === 401) {
          console.error("Token expired or invalid. Redirecting to login.");
          this.router.navigate(['/login']);
        } else {
          console.error("Error updating carpool:", err);
        }
      }
    });
  }

  // Delete a carpool
  deleteCarpool(carpoolId: number): void {
    const token = localStorage.getItem('authToken');
    if (!token) {
      console.error("No authentication token found.");
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if (!this.userId) {
      console.error("User not found.");
      return;
    }

    if (confirm("Are you sure you want to delete this carpool?")) {
      this.carpoolService.deleteCarpool(carpoolId, this.userId, headers).subscribe({
        next: () => {
          console.log("Carpool deleted successfully!");
          this.loadCarpools();
        },
        error: (err) => {
          console.error("Error deleting carpool:", err);
        }
      });
    }
  }

  // Load users who joined a carpool with their number of places
  loadUsersWhoJoined(carpoolId: number): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.isLoading = true;

    // Fetch users who joined
    this.carpoolService.getUsersWhoJoinedCarpool(carpoolId, headers).subscribe({
      next: (users) => {
        // Fetch carpool details to get joinedUsersPlaces
        this.carpoolService.getCarpoolById(carpoolId, headers).subscribe({
          next: (carpool) => {
            // Parse joinedUsersPlaces JSON
            let placesMap: { [key: number]: number } = {};
            try {
              if (carpool.joinedUsersPlaces) {
                placesMap = JSON.parse(carpool.joinedUsersPlaces);
              }
            } catch (e) {
              console.error("Error parsing joinedUsersPlaces:", e);
            }

            // Merge user details with numberOfPlaces
            this.usersWhoJoined = users.map((user: any) => ({
              userId: user.userId,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              numberOfPlaces: placesMap[user.userId] || 0
            }));

            console.log("Users who joined the carpool:", this.usersWhoJoined);
            this.noUsersMessage = this.usersWhoJoined.length === 0 ? "No users have joined this carpool." : "";
            this.isLoading = false;
          },
          error: (err) => {
            console.error("Error loading carpool details:", err);
            this.isLoading = false;
            this.noUsersMessage = "Error loading users.";
          }
        });
      },
      error: (err) => {
        console.error("Error loading users who joined the carpool:", err);
        this.isLoading = false;
        this.noUsersMessage = "Error loading users.";
      }
    });
  }
}