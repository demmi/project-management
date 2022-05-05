import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';

@NgModule({
  declarations: [
    BoardComponent,
    ColumnComponent,
    TaskComponent,
    BoardPageComponent,
    BoardsPageComponent,
  ],
  imports: [
    SharedModule,
    ProjectManagementRoutingModule,
  ],
  exports: [BoardPageComponent],
})
export class ProjectManagementModule { }
