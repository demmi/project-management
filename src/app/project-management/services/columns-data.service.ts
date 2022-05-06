import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Column } from '../../interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ColumnsDataService extends DefaultDataService<Column> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Column', http, httpUrlGenerator);
  }

}
