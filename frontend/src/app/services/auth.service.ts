import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
  _id: string;
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
  private readonly API_URL = 'http://localhost:3000/api/user';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        this.currentUserSubject.next(userData);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          if (response.token && response.user) {
            this.setSession(response);
          }
        })
      );
  }

  register(userData: {
    username: string;
    email: string;
    password: string;
    role?: string;
  }): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/register`, userData)
      .pipe(
        tap((response) => {
          if (response.token && response.user) {
            this.setSession(response);
          }
        })
      );
  }

  private setSession(authResult: AuthResponse) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('user', JSON.stringify(authResult.user));
    this.currentUserSubject.next(authResult.user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
