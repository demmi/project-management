import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginSignupPageComponent } from './pages/login-signup-page/login-signup-page.component';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './store/redusers/auth.redusers';
import { EffectsModule } from '@ngrx/effects';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    LoginSignupPageComponent,
    UserEditComponent,
  ],
    imports: [
        SharedModule,
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
        EffectsModule.forFeature([]),
        RouterModule,
    ],
  exports: [LoginSignupPageComponent, UserEditComponent],
})
export class AuthModule {}
