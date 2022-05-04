import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { ProjectsComponent } from './projects/projects.component';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ProjectManagementRoutingModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProjectsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ProjectManagementModule {}
