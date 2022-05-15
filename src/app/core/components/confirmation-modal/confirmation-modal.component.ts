import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardEntityService } from '../../../project-management/services/board-entity.service';
import { Column, ConfirmDialogData } from '../../../interface/interface';
import { EmmitService } from '../../../project-management/services/emmit.service';
import { ColumnEntityService } from '../../../project-management/services/column-entity.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
})
export class ConfirmationModalComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private boardService: BoardEntityService,
    private emmitService: EmmitService,
    private columnService: ColumnEntityService,
  ) {}


  confirm(): void {
    if (this.data.entityType === 'board' && this.data.entity.id) {
      this.boardService.delete(this.data.entity.id);
    }
    if (this.data.entityType === 'column' && this.data.entity.id) {
      this.emmitService.emmitBoardId((this.data.entity as Column).boardId as string);
      this.columnService.delete(this.data.entity as Column);
    }
    this.dialogRef.close();
  }
}
