import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../../interface/interface';
import { BoardEntityService } from '../../services/boards/board-entity.service';

interface Options {
  value: string;
}

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boards$: Observable<Array<Board>>;

  valueSearch = '';

  selectedValue: string = 'title';

  options: Options[] = [
    { value: 'title' },
    { value: 'order' },
    { value: 'descr' },
    { value: 'users' },
  ];

  constructor(private boardsService: BoardEntityService) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.entities$;
  }

}
