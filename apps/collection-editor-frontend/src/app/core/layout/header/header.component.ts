import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {}

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
}
