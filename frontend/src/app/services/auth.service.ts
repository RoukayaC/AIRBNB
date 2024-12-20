import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

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
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }
  private loggedInStatusChange = new BehaviorSubject<boolean>(false);

  get loggedInStatus$(): Observable<boolean> {
    return this.loggedInStatusChange.asObservable();
  }
  private isOwnerStatusChange = new BehaviorSubject<boolean>(false);

  get isOwnerStatus$(): Observable<boolean> {
    return this.isOwnerStatusChange.asObservable();
  }
  checkAuthStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') ?? '{}');
        this.currentUserSubject.next(userData);
        this.loggedInStatusChange.next(true);
        this.isOwnerStatusChange.next(userData.role === 'owner');
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
            this.checkAuthStatus();
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
    this.loggedInStatusChange.next(false);
    this.isOwnerStatusChange.next(false);
    this.currentUserSubject.next(null);
    console.log('Logged out', this.loggedInStatusChange.value);
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
