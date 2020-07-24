import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditorService } from '@app/core/services/editor.service';

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
   * Fetch data from API
   * @param id id
   */
  getData(id: number) {
    this.editorService.getDataTableById(id).subscribe((response) => {
      // console.log('response: ', response);
      this.dataTable = response;
    });
  }
}
