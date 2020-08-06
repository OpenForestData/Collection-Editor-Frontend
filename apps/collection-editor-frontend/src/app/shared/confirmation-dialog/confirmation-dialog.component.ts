import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

/**
 * Confirmation dialog component
 */
@Component({
  selector: 'collection-editor-frontend-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  /**
   * Title
   */
  title: string;
  /**
   * Message
   */
  message: string;

  /**
   * Confirmation dialog constructor
   * @param dialogRef Dialog reference
   * @param data Confirm dialog data
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  /**
   * Close dialog if yes button clicked
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Close dialog if no button clicked
   */
  onDismiss(): void {
    this.dialogRef.close(false);
  }
}

/**
 * Confirmation dialog model
 */
export class ConfirmDialogModel {
  /**
   * Confirmation dialog model
   * @param title Title
   * @param message Message
   */
  constructor(public title: string, public message: string) {}
}
