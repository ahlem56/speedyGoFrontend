import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('authToken');
    const userRole = localStorage.getItem('userRole')?.toUpperCase();
    const requiredRoles = route.data['roles'] as string[];

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if userRole exists and if any of the required roles match (case-insensitive)
    if (requiredRoles && userRole && !requiredRoles.some(role => role.toUpperCase() === userRole)) {
      console.log('Access denied. User role:', userRole, 'Required roles:', requiredRoles);
      this.router.navigate(['/access-denied']);
      return false;
    }

    return true;
  }
}
