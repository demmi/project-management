import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AuthEffects } from './auth/store/effects/auth.effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenAuthInterceptor } from './API/token-auth.interceptor';
import { ProjectManagementModule } from './project-management/project-management.module';
import { CoreModule } from './core/core.module';
import { TranslocoRootModule } from './transloco-root.module';
import { EntityDataModule } from '@ngrx/data';
import { HttpErrorsInterceptor } from './API/http-errors-interceptor.service';

const INTERCEPTOR_PROVIDERS: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenAuthInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorsInterceptor,
    multi: true,
  },
];
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects]),
    BrowserAnimationsModule,
    AuthModule,
    ProjectManagementModule,
    CoreModule,
    HttpClientModule,
    TranslocoRootModule,
    EntityDataModule.forRoot({}),
  ],
  providers: [INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
