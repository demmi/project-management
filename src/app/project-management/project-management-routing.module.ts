import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BoardsPageComponent } from './pages/boards-page/boards-page.component';

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: BoardsPageComponent,
    },
  ])],
  exports: [RouterModule],
})
export class ProjectManagementRoutingModule { }
