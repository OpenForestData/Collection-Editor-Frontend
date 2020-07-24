import { Component, OnInit } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';
import { Collection } from '@app/core/interfaces/collection';

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
   * Datatables options
   */
  dtOptions: DataTables.Settings = {};
  /**
   * Data in table
   */
  tableData: Collection[] = [];
  /**
   * Side panel visibility
   */
  sideVisible = false;

  /**
   * Tables list constructor
   * @param editorService Editor service
   */
  constructor(private editorService: EditorService) {}

  ngOnInit() {
    this.getListOfDataTables();
  }

  /**
   * Fetch list of datatables from API
   */
  getListOfDataTables() {
    this.editorService.getDataTables().subscribe((response) => {
      this.tableData = response.results;
    });
  }

  /**
   * Show and hide side panel
   */
  showSide() {
    this.sideVisible = !this.sideVisible;
  }
}
