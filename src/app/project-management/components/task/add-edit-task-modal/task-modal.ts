import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskDialogData } from '../../../../interface/interface';
import { TaskEntityService } from '../../../services/tasks/task-entity.service';
import { UserEntityService } from '../../../services/users/user-entity.service';
import { Observable, tap } from 'rxjs';
import { User } from '../../../../auth/model/user.interface';


@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './task-modal.component.html',
  styles: ['.inputs { display: flex;  flex-direction: column;}'],
})
export class TaskDialogComponent implements OnInit {

  form: FormGroup = this.createForm();

  users$: Observable<User[]>;

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private taskService: TaskEntityService,
    private userService: UserEntityService,
  ) {}

  ngOnInit() {
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
    return this.fb.group({
      title: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: this.fb.control(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      userId: this.fb.control(null, [Validators.required]),
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.taskService.add({ ...this.form.value, ...this.data });
      this.dialogRef.close();
    }
  }
}
