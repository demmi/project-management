import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpErrorsInterceptor implements HttpInterceptor {

  constructor(private _snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.error.statusCode === 409 || err.error.statusCode === 403) {
            this.showSnackBar(err);
          }
          return throwError(err.error.message);
        }),
      );
  }

  private showSnackBar(err: HttpErrorResponse): void {
    this._snackBar.open(
      err.error.message,
      'Ok',
      {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      },
    );
  }

}
