import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

/**
 * Auth guard
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  /**
   * Auth guard constructor
   * @param router Router
   * @param authenticationService Authentication service
   */
  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  /**
   * Can activate route
   * @param route Route
   * @param state State
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
