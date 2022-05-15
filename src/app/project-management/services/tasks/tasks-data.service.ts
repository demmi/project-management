import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Task } from '../../../interface/interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TasksDataService extends DefaultDataService<Task> {

  constructor(
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
  ) {
    super('Task', http, httpUrlGenerator);
  }

}
