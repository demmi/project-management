import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKanbanRestService } from '../../API/api-kanban-rest.service';
import { Board } from '../../interface/interface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  bords$: Observable<Array<Board>>;

  constructor(private api: ApiKanbanRestService) {}

  ngOnInit(): void {
    this.bords$ = this.api.bordsGet() as Observable<Array<Board>>;
  }
}
