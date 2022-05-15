import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Column } from '../../interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, switchMap } from 'rxjs';
import { ApiKanbanRestService } from '../../API/api-kanban-rest.service';
import { EmmitService } from './emmit.service';

@Injectable({ providedIn: 'root' })
export class ColumnsDataService extends DefaultDataService<Column> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private api: ApiKanbanRestService,
    private emmitService: EmmitService,
  ) {
    super('Column', http, httpUrlGenerator);
  }

  override add(column: Column): Observable<Column> {
    const { order, title, boardId } = column;
    return this.api.columnsPost(boardId as string, { order, title });
  }

  override getWithQuery(boardId: string): Observable<Column[]> {
    return this.api.columnsGet(boardId);
  }

  override delete(key: number | string): Observable<number | string> {
    return this.emmitService.boardId$
      .pipe(
        first(),
        switchMap(boardId => this.api.columnDelete(boardId, key as string)),
      );
  }

}
