import { Component, Input, OnInit } from '@angular/core';
import { Column, ConfirmDialogData, Task } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/columns/column-entity.service';
import { EmmitService } from '../../services/emmit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../core/components/confirmation-modal/confirmation-modal.component';
import { TaskEntityService } from '../../services/tasks/task-entity.service';
import { map, Observable, tap } from 'rxjs';
import { TaskDialogComponent } from '../task/add-edit-task-modal/task-modal';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;

  form: FormGroup;

  tasks$: Observable<Task[]>;

  in = true;

  futureTaskIndex: number;

  columnId: string;

  constructor(
    private columnService: ColumnEntityService,
    private emmitService: EmmitService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private taskService: TaskEntityService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.tasks$ = this.taskService.entities$.pipe(
      map((tasks) => tasks.filter((task) => task.columnId === this.column.id)),
      tap((tasks) => (this.futureTaskIndex = tasks.length))
    );
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
      }
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

  addTaskDialog(): void {
    this.dialog.open(TaskDialogComponent, {
      data: {
        boardId: this.column.boardId,
        columnId: this.column.id,
        order: this.futureTaskIndex,
        mode: 'create',
      },
    });
  }

  drop(event: CdkDragDrop<any>) {
    console.log(event);
    /*     console.log(event.previousContainer.data);
    console.log(event.container.data); */
  }
}
