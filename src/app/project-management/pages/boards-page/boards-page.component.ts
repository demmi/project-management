import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../../interface/interface';
import { BoardEntityService } from '../../services/boards/board-entity.service';
import { BoardsSortService } from '../../services/boards/boards-sort.service';

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

  constructor(
    private boardsService: BoardEntityService,
    private sortBoards: BoardsSortService,
  ) {}

  options: Options[] = [
    { value: 'title' },
    { value: 'order' },
    { value: 'descr' },
    { value: 'users' },
  ];

  ngOnInit(): void {
    this.boards$ = this.boardsService.entities$;
    this.sortBoards.getBoards();
    this.sortBoards.getUsers();
  }
}
