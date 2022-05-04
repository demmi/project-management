import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKanbanRestService } from '../../API/api-kanban-rest.service';
import { Board } from '../../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  bords$: Observable<Array<Board>>;

  constructor(private api: ApiKanbanRestService) {
    this.bords$ = this.api.bordsGet() as Observable<Array<Board>>;
  }
}
