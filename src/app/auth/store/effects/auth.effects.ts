import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from '../actions/auth.action-types';
import { concatMap, map, tap, withLatestFrom } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../selectors/auth.selector-types';
import { Router } from '@angular/router';
import { User } from '../../model/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthEffects {

  login$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(AuthActions.login),
          tap(action => localStorage.setItem('user', JSON.stringify(action.user))),
          map(action => AuthActions.setToken({ token: action.token })),
        );
    },
  );

  setToken$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(AuthActions.setToken),
          tap(action => {
            localStorage.setItem('token', action.token);
            this.router.navigateByUrl('/boards');
          }),
        );
    },
    { dispatch: false },
  );

  signup$ = createEffect(
    () => {
      return this.actions$
        .pipe(
          ofType(AuthActions.signup),
          concatMap(
            action => this.authService.login(
              {
                login: action.user.login,
                password: action.user.password,
              },
            ),
          ),
          // eslint-disable-next-line ngrx/prefer-concat-latest-from
          withLatestFrom(this.store.select(AuthSelectors.selectUser)),
          map(
            ([response, user]) => AuthActions.login(
              {
                user: user as User,
                token: response.token,
              },
            ),
          ),
        );
    },
  );

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }),
      );
    },
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store,
    private router: Router,
  ) {}


}
