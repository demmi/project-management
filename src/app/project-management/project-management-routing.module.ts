import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';
import { BoardsResolver } from './services/boards/boards.resolver';
import { BoardPageComponent } from './pages/board-page/board-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: BoardsPageComponent,
      resolve: {
        boards: BoardsResolver,
      },
    },
    {
      path: ':id',
      component: BoardPageComponent,
    },
  ])],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule { }
