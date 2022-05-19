import { Component, Input } from '@angular/core';
import { Task, TaskDialogData } from '../../../interface/interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from './add-edit-task-modal/task-modal';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {

  @Input() task: Task;

  constructor(
    private dialog: MatDialog,
  ) {}

  editTask(): void {
    this.dialog.open<TaskDialogComponent, TaskDialogData>(TaskDialogComponent, {
      data: {
        task: this.task,
        mode: 'edit',
      },
    });
  }

}
