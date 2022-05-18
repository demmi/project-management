import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../../interface/interface';
import { BoardEntityService } from '../../services/boards/board-entity.service';
import { BoardsSortService } from '../../services/boards/boards-sort.service';
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

  ngOnInit(): void {
    this.boards$ = this.boardsService.entities$;
    this.sortBoards.getBoards();
    this.sortBoards.getUsers();
  }
}
