import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectToken } from '../auth/store/selectors/auth.selectors';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  token = '';

  constructor(private store: Store) {
    this.store.select(selectToken).subscribe((token) => {
      if (token) {
        this.token = token;
      }
    });
  }

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
