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
  getDataTables(filters: any) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}datatable/?${queryParams}`);
  }

  /**
   * Fetch history of all datatables from API
   */
  getHistory(filters: any) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}datatable/history/?${queryParams}`);
  }

  /**
   * Create table
   * @param table Table object
   */
  createDataTable(table: any) {
    return this.http.post<any>(`${AppConfigService.config.api}datatable/`, table);
  }

  /**
   * Get data table by id
   * @param id Table id
   */
  getDataTableById(id: number) {
    return this.http.get<any>(`${AppConfigService.config.api}datatable/${id}`, {
      headers: { 'Content-Type': 'mutlipart/form-data' },
    });
  }

  retrievDataById(id: number, filters: any) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}datatable/${id}/?${queryParams}`);
  }

  addNewRow(tableId: number, columnNames: any) {
    return this.http.post<any>(`${AppConfigService.config.api}datatable/${tableId}/row/`, columnNames);
  }

  patchRow(tableId: number, rowId: string, rowData: any) {
    return this.http.patch<any>(`${AppConfigService.config.api}datatable/${tableId}/row/${rowId}/`, rowData);
  }

  deleteRowById(tableId: number, rowId: string) {
    return this.http.delete<any>(`${AppConfigService.config.api}datatable/${tableId}/row/${rowId}`);
  }

  exportTableById(tableId: number, pid: any, filters: any) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.post<any>(`${AppConfigService.config.api}datatable/${tableId}/export/?${queryParams}`, pid);
  }

  revertActionById(actionId: any) {
    return this.http.post<any>(`${AppConfigService.config.api}datatable/history/${actionId}/revert/`, {});
  }

  /**
   * Parse object to query param string
   * @param object Object
   * @returns Query params
   */
  getQueryParamsFromObject(object: any) {
    return Object.keys(object)
      .filter((key) => {
        return object[key] instanceof Array ? object[key].length > 0 : object[key] !== '' && object[key] !== null;
      })
      .map((key) => {
        if (object[key] instanceof Array) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(object[key].join(','));
        } else {
          return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
        }
      })
      .join('&');
  }
}
