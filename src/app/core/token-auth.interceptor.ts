import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {
  //The token for:
  //login: "user001",
  //password: "userpass@123"

  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkYzU3ZmIyZi0wMjEwLTRjZDctOTRlMC1kZWJhMjM0OTM5NDEiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTE0MTY0Mjd9.Dkm7H4fjs-cAQZKwwdpiQnkc9CYBlI4NWx2BuosJEMA';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    let token = this.token;
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(request);
  }
}
