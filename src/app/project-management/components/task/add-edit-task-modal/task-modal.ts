import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TaskDialogData } from '../../../../interface/interface';


@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './task-modal.component.html',
  styles: ['.inputs { display: flex;  flex-direction: column;}'],
})
export class TaskDialogComponent {
  form: FormGroup = this.createForm();

  addEditTaskSub$: Subscription;

  constructor(
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: TaskDialogData,
  ) {}

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
    });
  }

  submit(): void {
    if (this.form.valid) {
      console.log(this.data);
    }
  }
}
