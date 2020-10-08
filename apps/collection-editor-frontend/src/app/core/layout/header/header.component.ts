import { Component, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {
  /**
   * Is open?
   */
  isOpen = false;
  /**
   * Username
   */
  username = '';

  /**
   * Header constructor
   * @param authService Auth service
   * @param router Router
   */
  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.getUsername();
  }

  /**
   * Get username of current user
   */
  getUsername() {
    this.authService.getCurrentRole().subscribe((res: any) => {
      this.username = res.username;
    });
  }

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
    this.router.navigate(['/auth/login']);
    this.showSettings();
  }

  /**
   * Redirect user to main page
   */
  redirectToList() {
    this.router.navigate(['list']);
    this.showSettings();
  }

  /**
   * Redirect user to main page
   */
  redirectToHistory() {
    this.router.navigate(['history']);
    this.showSettings();
  }
}
