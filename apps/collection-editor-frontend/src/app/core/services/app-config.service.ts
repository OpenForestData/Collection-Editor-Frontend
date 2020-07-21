import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

/**
 * Application Config Interface
 */
export interface IConfig {
  /**
   * API URL
   */
  api: string;
  /**
   * Default language
   */
  language: string;
}

/**
 * Application config service
 */
@Injectable()
export class AppConfigService {
  /**
   * Application config
   */
  public static config: IConfig;

  /**
   * @ignore
   */
  constructor(private handler: HttpBackend) {}

  /**
   * Load config from file 'config.json'
   */
  load() {
    const jsonFile = `config.json`;
    /**
     * Return response of promise with config request
     */
    return new HttpClient(this.handler)
      .get(jsonFile)
      .toPromise()
      .then((response: IConfig) => {
        AppConfigService.config = response;
      });
  }
}
