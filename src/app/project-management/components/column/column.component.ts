import { Component, Input } from '@angular/core';
import { Column } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/column-entity.service';
import { EmmitService } from '../../services/emmit.service';

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

  constructor(
    private columnService: ColumnEntityService,
    private emmitService: EmmitService,
  ) {}


  deleteColumn() {
    this.emmitService.emmitBoardId(this.column.boardId as string);
    this.columnService.delete(this.column);
  }

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
    } else {
      this.columnService.update({ id: this.column.id, title: this.inputColumnHead, boardId: this.column.boardId, order: this.column.order });
    }
    this.onCanselEdit();
  }
}
