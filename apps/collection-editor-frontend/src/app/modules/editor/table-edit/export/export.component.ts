import { Component, EventEmitter, Output, Input } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';

/**
 * Export component
 */
@Component({
  selector: 'collection-editor-frontend-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
  /**
   * Dataset id
   */
  pid;
  /**
   * Error message
   */
  errorMessage: string;
  /**
   * Filters for export
   */
  @Input() filters;
  /**
   * Table id
   */
  @Input() tableId;
  /**
   * Is open
   */
  @Input() isOpen: boolean;
  /**
   * Is open change detector
   */
  @Output() isOpenChange = new EventEmitter<boolean>();

  /**
   * Export constructor
   * @param editorService Editor service
   */
  constructor(private editorService: EditorService) {}

  /**
   * Change status is open
   * @param status status
   */
  setOpen(status: boolean) {
    this.isOpen = status;
    this.isOpenChange.emit(status);
  }

  /**
   * Export table to dataset with given id
   */
  export() {
    this.editorService.exportTableById(this.tableId, this.pid, this.filters).subscribe(
      (response) => {
        this.setOpen(false);
      },
      (error) => {
        this.errorMessage = error.error.detail;
      }
    );
  }
}
