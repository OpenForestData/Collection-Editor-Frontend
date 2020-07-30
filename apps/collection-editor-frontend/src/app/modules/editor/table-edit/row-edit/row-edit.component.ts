import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';

/**
 * Row edit component
 */
@Component({
  selector: 'collection-editor-frontend-row-edit',
  templateUrl: './row-edit.component.html',
  styleUrls: ['./row-edit.component.scss'],
})
export class RowEditComponent implements OnInit {
  /**
   * Id of table
   */
  @Input() tableId;
  /**
   * Fields
   */
  @Input() fields;
  /**
   * Is open
   */
  @Input() isOpen: boolean;
  /**
   * Row details
   */
  @Input() rowDetails;
  /**
   * Is open change detector
   */
  @Output() isOpenChange = new EventEmitter<boolean>();
  /**
   * Trigger for refreshing parent
   */
  @Output() triggerRefresh = new EventEmitter<any>();
  /**
   * Row data
   */
  row;

  /**
   * Row edit constructor
   * @param editorService Editor service
   */
  constructor(private editorService: EditorService) {}

  ngOnInit() {
    this.row = { ...this.rowDetails };
  }

  /**
   * Change status is open
   * @param status status
   */
  setOpen(status: boolean) {
    this.isOpen = status;
    this.isOpenChange.emit(status);
  }

  /**
   * Update row
   */
  updateRow() {
    const updatedData = { ...this.row };
    delete updatedData['_id'];
    this.editorService.patchRow(this.tableId, this.row._id, updatedData).subscribe((response) => {
      this.setOpen(false);
      this.triggerRefresh.emit();
    });
  }
}
