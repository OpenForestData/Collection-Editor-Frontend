import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { AppConfigService } from '../services/app-config.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.access;
    const isApiUrl = request.url.startsWith(AppConfigService.config.api);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.access}`,
        },
      });
    }
    return next.handle(request);
  }
}
