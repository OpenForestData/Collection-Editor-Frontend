import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * Authentication service
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  /**
   * Current user subject
   */
  private currentUserSubject: BehaviorSubject<any>;
  // private currentUser: Observable<any>;

  /**
   * Authentication constructor
   * @param http Http client
   * @param cookieService Cookie service
   */
  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Get current user
   */
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Login function
   * @param username Username
   * @param password Password
   */
  login(username: string, password: string) {
    return this.http
      .post<any>(`${AppConfigService.config.api}token/`, { username, password })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.setAccessToken(user.access);
          this.setRefreshToken(user.refresh);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  /**
   * Logout function
   */
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.clearCookies();
  }

  /**
   * Refresh token
   */
  refreshToken() {
    return this.http
      .post<any>(`${AppConfigService.config.api}token/refresh/`, { refresh: this.currentUserValue.refresh })
      .pipe(
        map((user) => {
          this.setAccessToken(user.access);
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  /**
   * Set access token in cookies
   * @param accessToken Access token
   */
  setAccessToken(accessToken: string) {
    this.cookieService.set(
      'accessToken',
      accessToken,
      1,
      '/',
      window.location.hostname,
      location.protocol === 'https:',
      'None'
    );
  }

  /**
   * Set refresh token in cookies
   * @param refreshToken Refresh token
   */
  setRefreshToken(refreshToken: string) {
    this.cookieService.set(
      'refreshToken',
      refreshToken,
      1,
      '/',
      window.location.hostname,
      location.protocol === 'https:',
      'None'
    );
  }

  /**
   * Get access token
   */
  getAccessToken(): string {
    return this.cookieService.get('accessToken') || '';
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string {
    return this.cookieService.get('refreshToken') || '';
  }

  /**
   * Clear cookies
   */
  clearCookies() {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('refreshToken');
  }
}
