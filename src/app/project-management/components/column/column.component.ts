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

  tasks = [1, 2, 3];

  constructor(
    private columnService: ColumnEntityService,
    private testService: EmmitService,
  ) {}


  deleteColumn() {
    this.testService.emmitBoardId(this.column.boardId as string);
    this.columnService.delete(this.column);
  }
}
