import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.action-types';
import { concatMap, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../selectors/auth.selector-types';
import { User } from '../../model/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthEffects {

  login$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(AuthActions.login),
          tap(action => localStorage.setItem('user', JSON.stringify(action.user))),
          concatMap(action => this.authService.login(action.user)),
          map(response => AuthActions.setToken({ token: response.token })),
        );
    },
  );

  setToken$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(AuthActions.setToken),
          tap(action => localStorage.setItem('token', action.token)),
        );
    },
    { dispatch: false },
  );

  signup$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(AuthActions.signup),
          concatMap(action => this.authService.signup(action.user)),
          switchMap(() => this.store.select(AuthSelectors.selectUser)),
          map(user => AuthActions.login({ user: user as User })),
        );
    },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
  ) {}


}
