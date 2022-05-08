import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { LoginSignupPageComponent } from './auth/pages/login-signup-page/login-signup-page.component';
import { MainPageComponent } from './core/pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'boards',
    loadChildren: () =>
      import('./project-management/project-management.module').then(
        (m) => m.ProjectManagementModule,
      ),
  },
  { path: 'login', component: LoginSignupPageComponent },
  { path: 'signup', component: LoginSignupPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
