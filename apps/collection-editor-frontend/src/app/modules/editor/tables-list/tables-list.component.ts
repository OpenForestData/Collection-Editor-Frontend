import { Component, OnInit, Renderer2 } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';
import { Collection } from '@app/core/interfaces/collection';
import { trigger, state, style, animate, transition } from '@angular/animations';

/**
 * Tables list component
 */
@Component({
  selector: 'collection-editor-frontend-tables-list',
  templateUrl: './tables-list.component.html',
  styleUrls: ['./tables-list.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
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
  constructor(private editorService: EditorService, private renderer: Renderer2) {}

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
