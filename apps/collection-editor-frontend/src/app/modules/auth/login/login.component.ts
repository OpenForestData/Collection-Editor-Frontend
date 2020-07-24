import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { first } from 'rxjs/operators';

/**
 * Login component
 */
@Component({
  selector: 'collection-editor-frontend-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * Login form
   */
  loginForm: FormGroup;
  /**
   * Loading
   */
  loading = false;
  /**
   * Is submitted
   */
  submitted = false;
  /**
   * Return url
   */
  returnUrl: string;
  /**
   * Error container
   */
  error = '';

  /**
   *
   * @param formBuilder Form builder
   * @param route Route
   * @param router Router
   * @param authenticationService Authentication service
   */
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  /**
   * Form controls getter
   */
  get f() {
    return this.loginForm.controls;
  }

  /**
   * Submit login form
   */
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.router.navigate(['list']);
        },
        (error) => {
          this.error = error.error.detail;
          this.loading = false;
        }
      );
  }
}