import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Task } from '../../../interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiKanbanRestService } from '../../../API/api-kanban-rest.service';

@Injectable({ providedIn: 'root' })
export class TasksDataService extends DefaultDataService<Task> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private api: ApiKanbanRestService,
  ) {
    super('Task', http, httpUrlGenerator);
  }

  override add(task: Task): Observable<Task> {
    const { boardId, columnId, ...rest } = task;
    return this.api.tasksPost(boardId as string, columnId as string, rest);
  }

}
