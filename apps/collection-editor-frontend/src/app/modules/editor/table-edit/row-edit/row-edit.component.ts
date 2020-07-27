import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

  /**
   * Change status is open
   * @param status status
   */
  setOpen(status: boolean) {
    this.isOpen = status;
    this.isOpenChange.emit(status);
  }
}
