import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddColumnDialogData, Column } from '../../../../interface/interface';
import { ColumnEntityService } from '../../../services/columns/column-entity.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-column-dialog',
  templateUrl: './add-column-dialog.component.html',
})
export class AddColumnDialogComponent implements OnDestroy {

  form: FormGroup = this.createForm();

  addBoardSub: Subscription;

  constructor(
    private dialogRef: MatDialogRef<AddColumnDialogComponent>,
    private fb: FormBuilder,
    private columnService: ColumnEntityService,
    @Inject(MAT_DIALOG_DATA) private data: AddColumnDialogData,
  ) { }

  createForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control(
        null,
        [Validators.required, Validators.minLength(3)],
      ),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const newColumn: Column = {
        ...this.form.value,
        order: this.data.order,
        boardId: this.data.boardId,
      };
      this.addBoardSub = this.columnService.add(newColumn)
        .subscribe(() => this.dialogRef.close());
    }
  }

  ngOnDestroy(): void {
    this.addBoardSub.unsubscribe();
  }

}
