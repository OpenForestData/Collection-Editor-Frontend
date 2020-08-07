import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap, filter, take } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AppConfigService } from '../services/app-config.service';

/**
 * Error interceptor
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Is refreshing token
   */
  isRefreshing = false;
  /**
   * Subject for refresh token
   */
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * Error inteceptor constructor
   * @param authenticationService Authentication service
   * @param http Http client
   */
  constructor(private authenticationService: AuthenticationService, private http: HttpClient) {}

  /**
   * Handles 401 error
   * @param request Request
   * @param next Next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401 && !err.url.includes('api/token')) {
          return this.handle401Error(request, next);
        } else {
          return throwError(err);
        }
      })
    );
  }

  /**
   * Handle 401 error and refresh token
   * @param request Request
   * @param next Next
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          // this.refreshTokenSubject.next(token.access);
          return next.handle(
            this.addToken(request, {
              accessToken: this.authenticationService.getAccessToken(),
            })
          );
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(
            this.addToken(request, {
              accessToken: this.authenticationService.getAccessToken(),
            })
          );
        })
      );
    }
  }

  /**
   * Refresh token
   */
  refreshToken(): Observable<any> {
    const headers = new HttpHeaders({ 'X-RefreshToken': this.authenticationService.getRefreshToken() });
    return this.http
      .post<any>(
        `${AppConfigService.config.api}token/refresh/`,
        {
          refresh: this.authenticationService.getRefreshToken(),
        },
        { headers }
      )
      .pipe(
        map((tokens) => {
          this.authenticationService.setAccessToken(tokens.access);
        })
      );
  }

  /**
   * Set headers for authorization
   * @param request Request
   * @param token Token
   */
  addToken(request: HttpRequest<any>, token: { accessToken: string }): HttpRequest<any> {
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token.accessToken}`),
      });
    }
    return request;
  }
}
