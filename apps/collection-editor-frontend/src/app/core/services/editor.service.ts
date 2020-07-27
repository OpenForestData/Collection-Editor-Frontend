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

  addNewRow(tableId: number, columnNames: any) {
    return this.http.post<any>(`${AppConfigService.config.api}datatable/${tableId}/row/`, columnNames);
  }

  patchRow(tableId: number, rowId: string, rowData: any) {
    return this.http.post<any>(`${AppConfigService.config.api}datatable/${tableId}/row/${rowId}`, rowData);
  }

  deleteRowById(tableId: number, rowId: string) {
    return this.http.delete<any>(`${AppConfigService.config.api}datatable/${tableId}/row/${rowId}`);
  }
}
