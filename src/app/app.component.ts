import { Component, OnInit } from '@angular/core';
import { ApiKanbanRestService } from './API/api-kanban-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'project-management';

  constructor(private api: ApiKanbanRestService) {}

  ngOnInit(): void {
    this.api.usersGet().subscribe(console.log);
  }
}
