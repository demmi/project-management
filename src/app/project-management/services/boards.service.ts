import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKanbanRestService } from '../../API/api-kanban-rest.service';
import { Board } from '../../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: Observable<Array<Board>>;

  token: string | undefined;

  constructor(private api: ApiKanbanRestService) {
    this.boards$ = this.boardsGet();
  }

  newBoard(title: string) {
    return this.api.boardsPost({ title: title });
  }

  boardsGet() {
    return this.api.boardsGet() as Observable<Array<Board>>;
  }

  boardDelete(id: string) {
    return this.api.boardDelete(id);
  }
}
