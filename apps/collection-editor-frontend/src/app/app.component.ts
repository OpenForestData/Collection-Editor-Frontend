import { Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

import { LanguageService } from '@app/core/services/language.service';

/**
 * App constructor
 */
@Component({
  selector: 'collection-editor-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Title of app
   */
  title = 'Collection Editor Frontend';

  /**
   * App constructor
   * @param translateService Translate service
   * @param renderer Renderer
   * @param languageService Language service
   * @param platformId Platform id
   */
  constructor(
    private translateService: TranslateService,
    private renderer: Renderer2,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    this.useLanguage(this.languageService.language);
  }

  /**
   * Set default language
   * @param language Language
   */
  useLanguage(language: string): void {
    this.translateService.setDefaultLang(language);
    this.translateService.use(language);

    if (isPlatformBrowser(this.platformId)) {
      this.renderer.setAttribute(document.documentElement, 'lang', language);
    }
  }
}
