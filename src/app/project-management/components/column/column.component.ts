import { Component, Input } from '@angular/core';
import { Column } from '../../../interface/interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {

  @Input() column: Column;

  inputColumnHead = '';

  tasks = [1, 2, 3];

  in = true;

  onClickHead() {
    this.in = false;
  }

  onTitleInput(event: any) {
    this.inputColumnHead = event.target.value;
  }

  onCanselEdit() {
    this.in = true;
  }

  onConfirmChange() {
    if (this.inputColumnHead) {
      console.log(this.inputColumnHead);
    } else {
      console.log(this.column.title);
    }
    this.onCanselEdit();
  }
}
