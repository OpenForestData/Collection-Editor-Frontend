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

  getAllRowsFromDataTableById(id: number, filters: any) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}datatable/${id}/?${queryParams}`);
  }

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

  /**
   * Retrive data by id
   * @param id Id
   * @param filters Filters
   */
  retrievDataById(id: number, filters: any) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.get<any>(`${AppConfigService.config.api}datatable/${id}/?${queryParams}`);
  }

  /**
   * Add new row
   * @param tableId Table id
   * @param columnNames Column names
   */
  addNewRow(tableId: number, columnNames: any) {
    return this.http.post<any>(`${AppConfigService.config.api}datatable/${tableId}/row/`, columnNames);
  }

  /**
   * Patch row with given data
   * @param tableId Table id
   * @param rowId Row id
   * @param rowData Row data
   */
  patchRow(tableId: number, rowId: string, rowData: any) {
    return this.http.patch<any>(`${AppConfigService.config.api}datatable/${tableId}/row/${rowId}/`, rowData);
  }

  /**
   * Delete row by id
   * @param tableId Table id
   * @param rowId Row id
   */
  deleteRowById(tableId: number, rowId: string) {
    return this.http.delete<any>(`${AppConfigService.config.api}datatable/${tableId}/row/${rowId}`);
  }

  /**
   * Export table to dataset
   * @param tableId Table id
   * @param pid Dataset id
   * @param filters Filters
   */
  exportTableById(tableId: number, pid: any, filters: any) {
    const queryParams = this.getQueryParamsFromObject(filters);
    return this.http.post<any>(`${AppConfigService.config.api}datatable/${tableId}/export/?${queryParams}`, {
      dataset_pid: pid,
    });
  }

  /**
   * Revert action on database
   * @param actionId Id of action
   */
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
