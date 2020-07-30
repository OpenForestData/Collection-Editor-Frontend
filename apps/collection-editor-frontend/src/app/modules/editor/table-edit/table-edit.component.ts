import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from '@app/core/services/editor.service';
import { throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Table edit component
 */
@Component({
  selector: 'collection-editor-frontend-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
})
export class TableEditComponent implements OnInit {
  /**
   * Table id
   */
  tableId: number;
  /**
   * Data table
   */
  dataTable;
  /**
   * Column names
   */
  headings = [];
  /**
   * Is open
   */
  isOpen = false;
  /**
   * Row details
   */
  rowDetails;
  /**
   * Number of elements for paginator
   */
  count: number;
  /**
   * Page size for paginator
   */
  pageSize: number;
  /**
   * Filters for paginator
   */
  filters: any = { offset: 0, limit: 5, logical_query: '' };
  /**
   * Columns to display
   */
  displayColumn;
  /**
   * Is open export window
   */
  isOpenExport = false;
  /**
   * Page for paginator
   */
  page;

  /**
   * Table edit constructor
   * @param route Route
   * @param editorService Editor service
   */
  constructor(private route: ActivatedRoute, private editorService: EditorService) {}

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.tableId = param.id;
      this.getData(this.tableId);
    });
  }

  /**
   * Fetch data from API and set up column filtering
   * @param id id
   */
  getData(id: number) {
    this.editorService.retrievDataById(id, this.filters).subscribe((response) => {
      this.dataTable = new MatTableDataSource(response.results);
      this.count = response.count;
      this.headings = Object.keys(response.results[0]);
      this.headings.splice(this.headings.indexOf('_id'), 1);
      this.displayColumn = [...this.headings, 'edit', 'delete'];
    });
  }

  /**
   * Add row to table
   */
  addRow() {
    const temp = {};
    this.headings.forEach((heading) => {
      temp[heading] = ' ';
    });
    this.editorService.addNewRow(this.tableId, temp).subscribe(
      (response) => {
        this.page = Math.floor(this.count / this.filters['limit']);
        this.filters['offset'] = this.page * this.filters['limit'];
        this.getData(this.tableId);
      },
      (error) => {
        throwError(error.error);
      }
    );
  }

  /**
   * Edit table row
   * @param rowId Row id
   */
  editRow(row: any) {
    this.isOpen = !this.isOpen;
    this.rowDetails = row;
  }

  /**
   * Delete row in table
   * @param rowId Row id
   */
  deleteRow(rowId: string) {
    this.editorService.deleteRowById(this.tableId, rowId).subscribe(
      (response) => {
        this.getData(this.tableId);
      },
      (error) => {
        throwError(error.error);
      }
    );
  }

  /**
   * Advanced search
   */
  advancedSearch() {
    // or(Miesiac=7, and(Dzien=n8, Plec=m)
    this.filters['logical_query'] = decodeURI(this.filters['logical_query']);
    this.getData(this.tableId);
  }

  /**
   * Change pages for paginator and fetch data from API
   * @param event Event
   */
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    // this.filters = { offset: event.pageIndex * this.pageSize, limit: this.pageSize };
    this.filters['offset'] = event.pageIndex * this.pageSize;
    this.filters['limit'] = this.pageSize;
    this.getData(this.tableId);
  }

  /**
   * Search in column
   * @param columnName Name of column
   * @param event Event for getting current value
   */
  searchInColumn(columnName: string, event: any) {
    this.filters[columnName] = event.target.value;
    this.getData(this.tableId);
  }

  /**
   * Open window for export
   */
  exportWindowOpen() {
    this.isOpenExport = !this.isOpenExport;
  }
}
