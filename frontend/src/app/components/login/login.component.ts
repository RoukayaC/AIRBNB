import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.error = '';

    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          // Store token
          localStorage.setItem('token', response.token);

          // Store user info
          localStorage.setItem('user', JSON.stringify(response.user));

          // Redirect based on role
          if (response.user.role === 'owner') {
            this.router.navigate(['/owner/dashboard']);
          } else {
            this.router.navigate(['/user/dashboard']);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error?.msg || 'An error occurred during login';
        },
      });
  }
}
