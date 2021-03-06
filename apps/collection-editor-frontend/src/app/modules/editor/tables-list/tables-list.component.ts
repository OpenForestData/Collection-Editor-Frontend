import { Component, OnInit } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';
import { Collection } from '@app/core/interfaces/collection';
import { AuthenticationService } from '@app/core/services/authentication.service';

/**
 * Tables list component
 */
@Component({
  selector: 'collection-editor-frontend-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss'],
})
export class TablesListComponent implements OnInit {
  /**
   * Data in table
   */
  tableData: Collection[] = [];
  /**
   * Side panel visibility
   */
  sideVisible = false;
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
  displayColumn = ['id', 'title', 'collection name', 'edit'];
  /**
   * Filters for paginator
   */
  filters: any = { offset: 0, limit: 5 };
  /**
   * Role of current user
   */
  role;

  /**
   * Tables list constructor
   * @param editorService Editor service
   */
  constructor(private editorService: EditorService, private authService: AuthenticationService) {}

  /**
   * @ignore
   */
  ngOnInit() {
    this.getListOfDataTables();
  }

  /**
   * Fetch list of datatables from API
   */
  getListOfDataTables() {
    this.editorService.getDataTables(this.filters).subscribe((response) => {
      this.tableData = response.results;
      this.count = response.count;
    });
    this.authService.getCurrentRole().subscribe((response: any) => {
      this.role = response?.groups.filter((role) => role === 'ReadWrite').length > 0 ? 'ReadWrite' : 'ReadOnly';
    });
  }

  /**
   * Show and hide side panel
   */
  showSide() {
    this.sideVisible = !this.sideVisible;
  }

  /**
   * Change pages for paginator and fetch data from API
   * @param event Event
   */
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.filters = { offset: event.pageIndex * this.pageSize, limit: this.pageSize };
    this.getListOfDataTables();
  }
}
