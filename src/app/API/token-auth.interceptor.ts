import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  token: string | undefined;

  token$: Observable<any>;

  constructor(private store: Store<any>) {
    this.store
      .select((state) => state.auth.token)
      .subscribe((token) => (this.token = token));
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (this.token && request.url.includes('https://rss-pm.herokuapp.com/')) {
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
