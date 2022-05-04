import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
/* import { Store } from '@ngrx/store';
import { selectToken } from '../auth/store/selectors/auth.selectors'; */

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjkzZjJkZi01MTYyLTQ0MWQtYTUyNi1iMjBhNTczODgwMGQiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE2MzQ0NjB9.85-QT4l6jxGgWXO3wf51zXd-LpVYi1ihcZq3STTT84Q';

  /*   constructor(private store: Store) {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.token = token;
      }
    });
  } */

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.token.trim().length > 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
