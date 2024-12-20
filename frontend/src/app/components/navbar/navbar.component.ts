import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isUserMenuOpen = false;
  isLogged: boolean = false;
  isOwner: boolean = false;
  constructor(private router: Router, public authService: AuthService) {
    authService.checkAuthStatus();
    this.authService.loggedInStatus$.subscribe((status) => {
      this.isLogged = status;
    });
    this.authService.isOwnerStatus$.subscribe((status) => {
      this.isOwner = status;
    });
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
