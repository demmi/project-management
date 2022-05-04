import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSignupPageComponent } from './auth/pages/login-signup-page/login-signup-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'login', component: LoginSignupPageComponent },
  {
    path: 'projects',
    loadChildren: () =>
      import('./project-management/project-management.module').then(
        (m) => m.ProjectManagementModule,
      ),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
