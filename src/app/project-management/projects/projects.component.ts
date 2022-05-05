import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiKanbanRestService } from '../../API/api-kanban-rest.service';
import { Board } from '../../interface/interface';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  bords$: Observable<Array<Board>>;

  constructor(
    private projects: ProjectsService,
    private api: ApiKanbanRestService,
  ) {}

  ngOnInit(): void {
    this.api
      .authPost({
        login: 'user001',
        password: 'userpass@123',
      })
      .subscribe(console.log);
    this.projects.bords$.subscribe(console.log);
    this.api.bordsGet().subscribe(console.log);
  }
}
