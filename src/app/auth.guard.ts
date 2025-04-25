import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole');  // Get user role from localStorage

    if (token) {
      // Check if the user has the required role for the route
      const allowedRoles = route.data['roles'] as Array<string>;  // Get allowed roles from route data
      
      if (userRole && allowedRoles && allowedRoles.includes(userRole)) {
        return true;
      } else {
        // If the user doesn't have the correct role, redirect to "Access Denied" or another route
        this.router.navigate(['/access-denied']); 
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
