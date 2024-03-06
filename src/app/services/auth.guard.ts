import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLogedIn()) {
      return true; // Allow access if the user is logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login page if the user is not logged in
      return false; // Deny access
    }
  }
}
