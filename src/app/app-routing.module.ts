import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { LoginSignupPageComponent } from './auth/pages/login-signup-page/login-signup-page.component';

const routes: Routes = [
  { path: 'login', component: LoginSignupPageComponent },
  { path: 'signup', component: LoginSignupPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
