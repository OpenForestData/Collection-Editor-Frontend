import { Component, OnInit } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';

@Component({
  selector: 'collection-editor-frontend-list-history',
  templateUrl: './list-history.component.html',
  styleUrls: ['./list-history.component.scss'],
})
export class ListHistoryComponent implements OnInit {
  /**
   * Filters for paginator
   */
  filters: any = { offset: 0, limit: 5, ordering: 'created_at' };
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
   * History constructor
   * @param editorService Editor service
   */
  constructor(private editorService: EditorService) {}

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
