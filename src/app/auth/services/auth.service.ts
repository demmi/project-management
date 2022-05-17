import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { ApiKanbanRestService } from '../../API/api-kanban-rest.service';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../store/selectors/auth.selector-types';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user$: Observable<User | undefined>;

  isLogged$: Observable<boolean>;

  constructor(private api: ApiKanbanRestService, private store: Store) {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isLogged$ = this.user$.pipe(map((user) => !!user));
  }

  login(user: User): Observable<{ token: string }> {
    return this.api.authPost(user);
  }

  signup(user: User): Observable<User> {
    return this.api.registPost(user);
  }

  isAuth() : Promise<boolean> {
    return new Promise(resolve => {
      this.isLogged$.subscribe((isAuth) => resolve(isAuth));
    });
  }

  editUser(id: string, user: User): Observable<User> {
    return this.api.userPut(id, user);
  }

}
