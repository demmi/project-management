import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Task } from '../../../interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, withLatestFrom } from 'rxjs';
import { ApiKanbanRestService } from '../../../API/api-kanban-rest.service';
import { Update } from '@ngrx/entity';
import { EmmitService } from '../emmit.service';

@Injectable({ providedIn: 'root' })
export class TasksDataService extends DefaultDataService<Task> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private api: ApiKanbanRestService,
    private emmitService: EmmitService,
  ) {
    super('Task', http, httpUrlGenerator);
  }

  override add(task: Task): Observable<Task> {
    const { boardId, columnId, ...rest } = task;
    return this.api.tasksPost(boardId as string, columnId as string, rest);
  }

  override update(update: Update<Task>): Observable<Task> {
    const { files, id, ...rest } = update.changes;
    return this.api.taskPut(rest.boardId as string, rest.columnId as string, id as string, rest as Task);
  }

  override delete(key: number | string): Observable<number | string> {
    return this.emmitService.boardId$
      .pipe(
        withLatestFrom(this.emmitService.columnId$),
        switchMap(([boardId, columnId]) => this.api.taskDelete(boardId, columnId, key as string)),
      );
  }

}
