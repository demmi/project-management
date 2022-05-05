import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApiKanbanRestService } from '../API/api-kanban-rest.service';
import { Board } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  boards$: Observable<Array<Board>>;

  token: string | undefined;

  constructor(private api: ApiKanbanRestService, private store: Store<any>) {
    this.boards$ = this.api.boardsGet() as Observable<Array<Board>>;
  }

  newBoard(title: string) {
    return this.api.boardsPost({ title: title });
  }
}
