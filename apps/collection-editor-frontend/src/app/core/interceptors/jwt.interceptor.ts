import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AppConfigService } from '../services/app-config.service';

/**
 * Jwt interceptor
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  /**
   * Jwt interceptor constructor
   * @param authenticationService Authentication service
   */
  constructor(private authenticationService: AuthenticationService) {}

  /**
   * Check if user is logged and set headers
   * @param request Request
   * @param next Next
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.authenticationService.isLogged;
    const isApiUrl = request.url.startsWith(AppConfigService.config.api);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.getAccessToken()}`,
        },
      });
    }
    return next.handle(request);
  }
}
