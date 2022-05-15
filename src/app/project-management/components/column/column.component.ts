import { Component, Input, OnInit } from '@angular/core';
import { Column, ConfirmDialogData, Task } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/columns/column-entity.service';
import { EmmitService } from '../../services/emmit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../core/components/confirmation-modal/confirmation-modal.component';
import { TaskEntityService } from '../../services/tasks/task-entity.service';
import { map, Observable, tap } from 'rxjs';
import { User } from '../../../auth/model/user.interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {

  @Input() column: Column;

  @Input() users: User[] | null | undefined;

  form: FormGroup;

  tasks$: Observable<Task[]>;

  in = true;

  futureTaskIndex: number;

  constructor(
    private columnService: ColumnEntityService,
    private emmitService: EmmitService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private taskService: TaskEntityService,
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.tasks$ = this.taskService.entities$
      .pipe(
        map(tasks => tasks.filter((task => task.columnId === this.column.id))),
        tap(tasks => this.futureTaskIndex = tasks.length),
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

  addTask() {
    let userId: string;
    if (this.users && this.users[0]) {
      userId = this.users[0].id as string;
      const newTask: Task = {
        title: 'Task',
        order: this.futureTaskIndex,
        description: 'Task description',
        boardId: this.column.boardId,
        columnId: this.column.id,
        userId,
      };
      this.taskService.add(newTask);
    }
  }
}
