import { Component, Input } from '@angular/core';
import { Column } from '../../../interface/interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {

  @Input() column: Column;

  tasks = [1, 2, 3];

}
