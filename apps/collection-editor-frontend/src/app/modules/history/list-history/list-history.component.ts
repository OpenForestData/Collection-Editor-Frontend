import { Component, OnInit } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';
import { AuthenticationService } from '@app/core/services/authentication.service';

/**
 * List history component
 */
@Component({
  selector: 'collection-editor-frontend-list-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.scss'],
})
export class ListHistoryComponent implements OnInit {
  /**
   * Filters for paginator
   */
  filters: any = { offset: 0, limit: 5 };
  /**
   * Data in table
   */
  tableData: any;
  /**
   * Number of elements for paginator
   */
  count: number;
  /**
   * Page size for paginator
   */
  pageSize: number;
  /**
   * Columns to display
   */
  displayColumn = ['id', 'datatable', 'user', 'action', 'created_at', 'reverted', 'revert'];
  /**
   * Role of current user
   */
  role;

  /**
   * History constructor
   * @param editorService Editor service
   */
  constructor(private editorService: EditorService, private authService: AuthenticationService) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.getHistoryOfDatatables();
  }

  /**
   * Fetch list of datatables from API
   */
  getHistoryOfDatatables() {
    this.editorService.getHistory(this.filters).subscribe((response) => {
      this.tableData = response.results;
      this.count = response.count;
    });
    this.authService.getCurrentRole().subscribe((response: any) => {
      this.role = response?.groups.filter((role) => role === 'ReadWrite').length > 0 ? 'ReadWrite' : 'ReadOnly';
    });
  }

  /**
   * Change pages for paginator and fetch data from API
   * @param event Event
   */
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.filters = { offset: event.pageIndex * this.pageSize, limit: this.pageSize };
    this.getHistoryOfDatatables();
  }

  /**
   * Revert action made on database
   * @param row Row details
   */
  revertAction(row: any) {
    this.editorService.revertActionById(row.id).subscribe((response) => {
      this.getHistoryOfDatatables();
    });
  }
}
