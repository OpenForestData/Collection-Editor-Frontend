import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from '@app/core/services/editor.service';
import { throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material';
import {
  ConfirmDialogModel,
  ConfirmationDialogComponent,
} from '@app/shared/confirmation-dialog/confirmation-dialog.component';
import { jsPDF } from 'jspdf';

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
   * Result from confirm dialog
   */
  result = false;
  /**
   * Initial columns
   */
  initialColumns;

  /**
   * Table edit constructor
   * @param route Route
   * @param editorService Editor service
   * @param dialog Mat dialog
   */
  constructor(private route: ActivatedRoute, private editorService: EditorService, public dialog: MatDialog) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.tableId = param.id;
      this.getData(this.tableId);
    });
  }

  /**
   * Prints window
   */
  printWindow() {
    window.print();
  }

  /**
   * Copy current data to clipboard
   */
  copyData() {
    return JSON.stringify(this.dataTable.data);
  }

  /**
   * Convert datatable to PDF
   */
  convertToPDF() {
    let data: any = {};
    this.editorService.getAllRowsFromDataTableById(this.tableId, this.filters).subscribe((response: any) => {
      const result = [];
      data = response;
      /* tslint:disable */
      for (let i = 0; i < data.results.length; i += 1) {
        delete data.results[i]._id;
        result.push(Object.assign({}, data.results[i]));
      }
      const headers = this.createHeaders(this.initialColumns);
      const doc = new jsPDF();
      doc.table(1, 1, result, headers, { autoSize: true });
      doc.save();
    });
  }

  /**
   * Create headers based on given keys
   * @param keys Keys
   * @returns list of headers for table
   */
  createHeaders(keys: any) {
    const result = [];
    for (const key of keys) {
      result.push({
        id: key,
        name: key,
        prompt: key,
        width: 65,
        align: 'center',
        padding: 0,
      });
    }
    return result;
  }

  /**
   * Fetch data from API and set up column filtering
   * @param id id
   */
  getData(id: number) {
    this.editorService.retrievDataById(id, this.filters).subscribe((response) => {
      this.dataTable = new MatTableDataSource(response.results);
      this.count = response.count;
      this.initialColumns = Object.values(response.columns);
      this.displayColumn = [...this.initialColumns, 'edit', 'delete'];
    });
  }

  /**
   * Add row to table
   */
  addRow() {
    const temp = {};
    this.displayColumn.forEach((heading) => {
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
   * Confirmation delete dialog
   * @param rowId Row id
   */
  confirmDeleteDialog(rowId: string): void {
    const message = `Are you sure you want to do this?`;
    const dialogData = new ConfirmDialogModel('Confirm Action', message);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        this.deleteRow(rowId);
      }
    });
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
