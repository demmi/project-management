import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs';
import { ApiKanbanRestService } from '../../../API/api-kanban-rest.service';

@Injectable({ providedIn: 'root' })
export class BoardsSortService {
  tasksAll: any[] = [];

  usersAll: any[] = [];

  constructor(private api: ApiKanbanRestService) {}

  getBoards() {
    return this.api
      .boardsGet()
      .pipe(
        mergeMap((boards) =>
          boards.map((board) => (board.id ? this.getColms(board.id) : board)),
        ),
      ).subscribe();
  }

  getColms(boardId: string) {
    return this.api
      .columnsGet(boardId)
      .pipe(
        mergeMap((colums) =>
          colums.map((colum) =>
            colum.id ? this.getTasks(boardId, colum.id) : colum,
          ),
        ),
      ).subscribe();
  }

  getTasks(boardId: string, columId: string) {
    return this.api.tasksGet(boardId, columId).subscribe(el => this.tasksAll.push(...el));
  }

  getUsers() {
    this.api.usersGet().subscribe(users => this.usersAll = [...users]);
  }
}
