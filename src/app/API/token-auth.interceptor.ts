import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
/* import { selectToken } from '../auth/store/selectors/auth.selectors'; */

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YjkzZjJkZi01MTYyLTQ0MWQtYTUyNi1iMjBhNTczODgwMGQiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE0MzYzMjd9.I8LGlSKsCmflN7d3r0B-gU04ijQPpfbqGTN9rj2lyNk';

  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    /* this.token = this.store.select(selectToken); */
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    return next.handle(request);
  }
}
