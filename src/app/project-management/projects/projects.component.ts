import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../interface/interface';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  bords$: Observable<Array<Board>>;

  constructor(private projects : ProjectsService) {}

  ngOnInit(): void {
    this.bords$ = this.projects.bords$;
  }
}
