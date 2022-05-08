import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { ApiKanbanRestService } from '../../API/api-kanban-rest.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private http: HttpClient,
    private api: ApiKanbanRestService,
  ) {}

  login(user: User): Observable<{ token: string }> {
    return this.api.authPost(user);
  }

  signup(user: User): Observable<User> {
    return this.api.registPost(user);
  }

}
