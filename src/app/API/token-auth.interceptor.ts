import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthSelectors } from '../auth/store/selectors/auth.selector-types';
@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  token: string | undefined;

  token$: Observable<any>;

  constructor(private store: Store) {
    this.store
      .select(AuthSelectors.selectToken)
      .subscribe((token) => (this.token = token));
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.token) {
      if (this.token.trim().length > 0) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${this.token}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}
