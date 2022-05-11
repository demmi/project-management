import { Component, Input } from '@angular/core';
import { Column } from '../../../interface/interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {

  @Input() column: Column;

  inputBoardHead = '';

  tasks = [1, 2, 3];

  in = true;

  onClickHead() {
    this.in = false;
  }

  onTitleInput(event: any) {
    this.inputBoardHead = event.target.value;
  }

  onCanselEdit() {
    this.in = true;
  }

  onConfirmChange() {
    console.log(this.inputBoardHead);
  }
}
