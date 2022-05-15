import { Component, Input, OnInit } from '@angular/core';
import { Column } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/column-entity.service';
import { EmmitService } from '../../services/emmit.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    this.emmitService.emmitBoardId(this.column.boardId as string);
    this.columnService.delete(this.column);
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
