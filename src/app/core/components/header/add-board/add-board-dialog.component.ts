import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Board } from '../../../../interface/interface';
import { BoardEntityService } from '../../../../project-management/services/boards/board-entity.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-boards',
  templateUrl: './add-board-dialog.component.html',
})
export class AddBoardDialogComponent {

  form: FormGroup = this.createForm();

  constructor(
    private fb: FormBuilder,
    private boardService: BoardEntityService,
    private dialogRef: MatDialogRef<AddBoardDialogComponent>,
  ) { }

  createForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control(
        null,
        [Validators.required, Validators.minLength(3)],
      ),
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      const newBoard: Board = { ...this.form.value };
      this.boardService.add(newBoard)
        .subscribe(() => this.dialogRef.close());
    }
  }

}
