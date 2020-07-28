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
  filters: any = { offset: 0, limit: 5 };
  /**
   * Columns to display
   */
  displayColumn;

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
      this.count = response.count;
      this.headings = Object.keys(response.results[0]);
      this.headings.splice(this.headings.indexOf('_id'), 1);
      this.displayColumn = [...this.headings, 'edit', 'delete'];
      this.dataTable = new MatTableDataSource(response.results);
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

  advancedSearch() {
    // let logicalQuery = '?logical_query=or(species=deer, and(species=bear, color=black))';
    const logicalQuery =
      '?logical_query=or(Variable_code=H06, and(Industry_aggregation_NZSIOC=Level 1, Variable_code=H05))';
    this.editorService.retrievDataById(this.tableId, logicalQuery).subscribe((response) => {
      // this.dataTable = response.results;

      this.dataTable = response.results;
      this.headings = Object.keys(this.dataTable[0]);
      this.headings.splice(this.headings.indexOf('_id'), 1);
    });
  }
  /**
   * Change pages for paginator and fetch data from API
   * @param event Event
   */
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.filters = { offset: event.pageIndex * this.pageSize, limit: this.pageSize };
    this.getData(this.tableId);
  }
}
