import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from '@app/app-routing.module';
import { MainLayoutComponent } from '@app/core/layout/main-layout/main-layout.component';
import { AppConfigService } from '@app/core/services/app-config.service';
import { AppComponent } from './app.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { HeaderComponent } from './core/layout/header/header.component';

/**
 * Initialize translate loader
 * @param httpClient Angular HttpClient
 */
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

/**
 * Load configuration on initialize application
 * @param appConfigService Application config service
 */
export function initializeApp(appConfigService: AppConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    AppConfigService,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfigService, HttpClientModule], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
