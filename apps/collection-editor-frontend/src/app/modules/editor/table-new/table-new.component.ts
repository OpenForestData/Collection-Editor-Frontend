import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EditorService } from '@app/core/services/editor.service';
import { FormGroup, FormControl } from '@angular/forms';

/**
 * New table component
 */
@Component({
  selector: 'collection-editor-frontend-table-new',
  templateUrl: './table-new.component.html',
  styleUrls: ['./table-new.component.scss'],
})
export class TableNewComponent {
  /**
   * New table form
   */
  newTableForm = new FormGroup({
    title: new FormControl(''),
    file: new FormControl(''),
    collection_name: new FormControl(''),
  });
  /**
   * Is open
   */
  @Input() isOpen: boolean;
  /**
   * Is open change detector
   */
  @Output() isOpenChange = new EventEmitter<boolean>();
  /**
   * Refresh table trigger
   */
  @Output() refreshTableTrigger = new EventEmitter<any>();
  /**
   * Errors
   */
  errors: any = {};
  /**
   * Loader status
   */
  loader = false;

  /**
   * New table constructor
   * @param editorService Editor service
   */
  constructor(private editorService: EditorService) {}

  /**
   * Add new table
   */
  addNewTable() {
    this.loader = true;
    const formData = new FormData();
    formData.append('title', this.newTableForm.get('title').value);
    formData.append('collection_name', this.newTableForm.get('collection_name').value);
    formData.append('file', this.newTableForm.get('file').value);
    this.editorService.createDataTable(formData).subscribe(
      (response) => {
        this.setOpen(false);
        this.refreshTableTrigger.emit();
        this.loader = false;
      },
      (error) => {
        this.loader = false;
        this.errors = error.error;
      }
    );
  }

  /**
   * File upload
   * @param event Event
   */
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files[0];
      if (file.name.split('.').pop() === 'csv') {
        const blob = file.slice(0, file.size, 'text/csv');
        file = new File([blob], file.name, { type: 'text/csv' });
        this.newTableForm.get('file').setValue(file);
      } else {
        const blob = file.slice(0, file.size, 'application/vnd.ms-excel');
        file = new File([blob], file.name, { type: 'application/vnd.ms-excel' });
        this.newTableForm.get('file').setValue(file);
      }
    }
  }

  /**
   * Change status is open
   * @param status status
   */
  setOpen(status: boolean) {
    this.isOpen = status;
    this.isOpenChange.emit(status);
  }
}
