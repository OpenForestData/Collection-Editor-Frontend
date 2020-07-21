import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfigService } from './app-config.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<any>;
  private refreshTokenTimeout;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${AppConfigService.config.api}token/`, { username, password })
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.startRefreshTokenTime();
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.stopRefreshTokenTime();
  }

  refreshToken() {
    return this.http
      .post<any>(
        `${AppConfigService.config.api}token/refresh/`,
        { refresh: this.currentUserValue.refresh },
        { withCredentials: true }
      )
      .pipe(
        map((user) => {
          this.currentUserSubject.next(user);
          this.startRefreshTokenTime();
          return user;
        })
      );
  }

  private startRefreshTokenTime() {
    const expires = new Date(Date.now() + 5 * 60000);
    const timeout = expires.getTime() - Date.now() - 60 * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTime() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
