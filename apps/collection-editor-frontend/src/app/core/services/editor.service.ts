import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

/**
 * Editor service
 */
@Injectable({
  providedIn: 'root',
})
export class EditorService {
  /**
   * Editor constructor
   * @param http Http Client
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetch list of datatables from API
   */
  getDataTables() {
    return this.http.get<any>(`${AppConfigService.config.api}datatable/`);
  }
}
