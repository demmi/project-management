import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { LoginSignupPageComponent } from './auth/pages/login-signup-page/login-signup-page.component';
import { MainPageComponent } from './core/pages/main-page/main-page.component';
import { AuthGuard } from './auth/services/auth.guard';
import { AuthTrueGuard } from './auth/services/auth-true.guard';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'boards',
    loadChildren: () =>
      import('./project-management/project-management.module').then(
        (m) => m.ProjectManagementModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginSignupPageComponent,
    canActivate: [AuthTrueGuard],
  },
  {
    path: 'signup',
    component: LoginSignupPageComponent,
    canActivate: [AuthTrueGuard],
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
