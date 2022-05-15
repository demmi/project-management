import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { User } from '../../../auth/model/user.interface';
import { HttpClient } from '@angular/common/http';
import { ApiKanbanRestService } from '../../../API/api-kanban-rest.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsersDataService extends DefaultDataService<User> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    private api: ApiKanbanRestService,
  ) {
    super('User', http, httpUrlGenerator);
  }

  override getAll(): Observable<User[]> {
    return this.api.usersGet();
  }

}
