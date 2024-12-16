import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isPropertyOwner = false; // You can set this based on user role
  isLoggedIn = false; // You can set this based on authentication status
  isUserMenuOpen = false;

  constructor(private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    // Implement your authentication check logic here
    // For example, check if there's a valid token in localStorage
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;

    // Check user role - implement your own logic
    const userRole = localStorage.getItem('userRole');
    this.isPropertyOwner = userRole === 'owner';
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout(): void {
    // Implement logout logic here
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.isLoggedIn = false;
    this.isPropertyOwner = false;
    this.router.navigate(['/login']);
  }
}
