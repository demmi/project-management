import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginSignupPageComponent } from './pages/login-signup-page/login-signup-page.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LoginSignupPageComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [LoginSignupPageComponent],
})
export class AuthModule {}
