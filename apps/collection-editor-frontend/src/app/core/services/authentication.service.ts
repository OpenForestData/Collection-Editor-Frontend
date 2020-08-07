import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * Authentication service
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  /**
   * Authentication constructor
   * @param http Http client
   * @param cookieService Cookie service
   */
  constructor(private http: HttpClient, public cookieService: CookieService) {}

  public get isLogged() {
    return this.cookieService.check('accessToken');
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
          this.setAccessToken(user.access);
          this.setRefreshToken(user.refresh);
          return user;
        })
      );
  }

  /**
   * Logout function
   */
  logout() {
    this.clearCookies();
  }

  /**
   * Refresh token
   */
  refreshToken() {
    return this.http
      .post<any>(`${AppConfigService.config.api}token/refresh/`, { refresh: this.getRefreshToken() })
      .pipe(
        map((user) => {
          this.setAccessToken(user.access);
          return user;
        })
      );
  }

  /**
   * Set access token in cookies
   * @param accessToken Access token
   */
  setAccessToken(accessToken: string) {
    if (window.location.protocol === 'https:') {
      this.cookieService.set(
        'accessToken',
        accessToken,
        1,
        '/',
        window.location.hostname,
        window.location.protocol === 'https:',
        'None'
      );
    } else {
      this.cookieService.set('accessToken', accessToken, 1, '/');
    }
  }

  /**
   * Set refresh token in cookies
   * @param refreshToken Refresh token
   */
  setRefreshToken(refreshToken: string) {
    if (window.location.protocol === 'https:') {
      this.cookieService.set(
        'refreshToken',
        refreshToken,
        1,
        '/',
        window.location.hostname,
        window.location.protocol === 'https:',
        'None'
      );
    } else {
      this.cookieService.set('refreshToken', refreshToken, 1, '/');
    }
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
    this.cookieService.delete('accessToken', '/', window.location.hostname);
    this.cookieService.delete('refreshToken', '/', window.location.hostname);
  }
}
