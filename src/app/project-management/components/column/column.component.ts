import { Component, Input } from '@angular/core';
import { Column } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/column-entity.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {

  constructor(private columnService: ColumnEntityService) {}

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
      this.columnService.update({ id: this.column.id, title: this.inputColumnHead, boardId: this.column.boardId, order: this.column.order });
      console.log(this.inputColumnHead);
    } else {
      this.columnService.update({ id: this.column.id, title: this.inputColumnHead, boardId: this.column.boardId, order: this.column.order });
      console.log(this.column.title);
    }
    this.onCanselEdit();
  }
}
