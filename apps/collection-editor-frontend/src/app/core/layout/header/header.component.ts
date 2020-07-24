import { Component } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Router } from '@angular/router';

/**
 * Header component
 */
@Component({
  selector: 'collection-editor-frontend-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * Is open?
   */
  isOpen = false;

  /**
   * Header constructor
   * @param authService Auth service
   * @param router Router
   */
  constructor(private authService: AuthenticationService, private router: Router) {}

  /**
   * Toggle more settings
   */
  showSettings() {
    this.isOpen = !this.isOpen;
  }

  /**
   * Logout user
   */
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  /**
   * Redirect user to main page
   */
  redirectToList() {
    this.router.navigate(['list']);
  }
}
