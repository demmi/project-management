import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Board } from '../../../interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiKanbanRestService } from '../../../API/api-kanban-rest.service';

@Injectable({ providedIn: 'root' })
export class BoardsDataService extends DefaultDataService<Board> {
  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private api: ApiKanbanRestService,
  ) {
    super('Board', http, httpUrlGenerator);
  }

  override getAll(): Observable<Board[]> {
    return this.api.boardsGet();
  }

  override add(board: Board): Observable<Board> {
    return this.api.boardsPost(board);
  }

  override delete(key: string): Observable<number | string> {
    return this.api.boardDelete(key);
  }
}
