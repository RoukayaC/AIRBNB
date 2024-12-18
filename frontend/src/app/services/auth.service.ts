import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  status: string;
  msg: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/api/users';
  // adjust to your backend URL

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check for existing token and user data on service initialization

    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  register(data: {
    username: string;
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:3000/api/user/register', data)
      .pipe(
        tap((response) => {
          if (response.status === 'ok') {
            this.handleAuthSuccess(response);
          }
        })
      );
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('http://localhost:3000/api/user/login', credentials)
      .pipe(
        tap((response) => {
          if (response.status === 'ok') {
            this.handleAuthSuccess(response);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);

    // Redirect based on user role

    if (response.user.role === 'owner') {
      this.router.navigate(['/owner/dashboard']);
    } else {
      this.router.navigate(['/user/search']);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  getUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role;
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
 
}
