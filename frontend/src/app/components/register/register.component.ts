import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = 'user';
  error: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  errors: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.username || this.username.length < 3) {
      this.errors.username = 'Username must be at least 3 characters long';
      isValid = false;
    }

    if (
      !this.email ||
      !this.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    ) {
      this.errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!this.password || this.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters long';
      isValid = false;
    }

    if (this.password !== this.confirmPassword) {
      this.errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.successMessage = '';

    this.authService
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
        //role: this.role,
      })
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          this.successMessage = 'Registration successful! Redirecting...';
        },
        error: (err) => {
          this.isLoading = false;
          this.error =
            err.error?.msg || 'An error occurred during registration';
        },
      });
  }
}
