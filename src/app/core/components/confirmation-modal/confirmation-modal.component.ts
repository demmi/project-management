import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardEntityService } from '../../../project-management/services/board-entity.service';
import { ConfirmDialogData } from '../../../interface/interface';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
})
export class ConfirmationModalComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private boardService: BoardEntityService,
  ) {}


  confirm(): void {
    if (this.data.entityType === 'board' && this.data.entity.id) {
      this.boardService.delete(this.data.entity.id);
    }
    this.dialogRef.close();
  }
}
