import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { EntityDataService, EntityDefinitionService } from '@ngrx/data';
import { entityMetadata } from './entity-metadata';
import { BoardsDataService } from './services/boards-data.service';
import { ColumnsDataService } from './services/columns-data.service';
import { TasksDataService } from './services/tasks-data.service';
import { BoardCardComponent } from './components/board-card/board-card.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    TaskComponent,
    BoardPageComponent,
    BoardsPageComponent,
    BoardCardComponent,
  ],
  imports: [
    SharedModule,
    ProjectManagementRoutingModule,
  ],
  exports: [BoardPageComponent],
})
export class ProjectManagementModule {

  constructor(
    private eds: EntityDefinitionService,
    private entityDataService: EntityDataService,
    private boardsDataService: BoardsDataService,
    private columnDataService: ColumnsDataService,
    private taskDataService: TasksDataService,
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerServices({
      'Board': boardsDataService,
      'Column': columnDataService,
      'Task': taskDataService,
    });
  }

}
