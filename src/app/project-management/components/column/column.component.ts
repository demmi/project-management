import { Component, Input, OnInit } from '@angular/core';
import { Column, ConfirmDialogData } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/column-entity.service';
import { EmmitService } from '../../services/emmit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../core/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {

  @Input() column: Column;

  form: FormGroup;

  tasks = [1, 2, 3];

  in = true;

  constructor(
    private columnService: ColumnEntityService,
    private emmitService: EmmitService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: this.fb.control(this.column.title, [Validators.minLength(3)]),
    });
  }

  deleteColumn() {
    this.dialog.open<ConfirmationModalComponent, ConfirmDialogData>(
      ConfirmationModalComponent,
      {
        data: {
          entityType: 'column',
          entity: this.column,
        },
      },
    );
  }

  updateColumnTitle() {
    if (this.form.valid) {
      const { boardId, ...rest } = this.column;
      this.emmitService.emmitBoardId(this.column.boardId as string);
      this.columnService.update({ ...rest, ...this.form.value });
    }
  }

  onClickHead() {
    this.in = false;
    this.form.get('title')?.setValue(this.column.title);
  }
}
