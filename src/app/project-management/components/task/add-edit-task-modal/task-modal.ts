import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogData } from '../../../../interface/interface';
import { TaskEntityService } from '../../../services/tasks/task-entity.service';
import { UserEntityService } from '../../../services/users/user-entity.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../../../auth/model/user.interface';

interface InitialFormState {
  title: string;
  description: string;
  userId: string;
}

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './task-modal.component.html',
  styles: ['.inputs { display: flex;  flex-direction: column;}'],
})
export class TaskDialogComponent implements OnInit {

  form: FormGroup = this.createForm();

  users$: Observable<User[]>;

  edit: boolean;

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private taskService: TaskEntityService,
    private userService: UserEntityService,
  ) {}

  ngOnInit() {
    this.edit = this.data.mode === 'edit';
    this.disableEnableControls(this.edit);
    let usersLoaded: boolean = false;
    this.users$ = this.userService.entities$
      .pipe(
        tap(() => {
          if (!usersLoaded) {
            this.userService.getAll();
            usersLoaded = true;
          }
        }),
      );
  }

  createForm(): FormGroup {
    const initialFormState = this.getInitialFormState();
    return this.fb.group({
      title: this.fb.control(initialFormState.title, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: this.fb.control(initialFormState.description, [
        Validators.required,
        Validators.minLength(3),
      ]),
      userId: this.fb.control(initialFormState.userId, [Validators.required]),
    });
  }

  private getInitialFormState(): InitialFormState {
    if (this.data.mode === 'edit') {
      const { task } = this.data;
      return {
        title: task?.title as string,
        description: task?.description as string,
        userId: task?.userId as string,
      };
    }
    return {
      title: '',
      description: '',
      userId: '',
    };
  }

  disableEnableControls(disable: boolean): void {
    if (disable) {
      this.form.get('title')?.disable();
      this.form.get('description')?.disable();
      this.form.get('userId')?.disable();
      return;
    }
    this.form.get('title')?.enable();
    this.form.get('description')?.enable();
    this.form.get('userId')?.enable();
  }

  submit(): void {
    if (this.form.valid) {
      if (this.data.mode === 'edit') {
        this.taskService.update({ ...this.data.task, ...this.form.value });
      } else {
        const { mode, ...rest } = this.data;
        this.taskService.add({ ...this.form.value, ...rest });
      }
      this.dialogRef.close();
    }
  }
}
