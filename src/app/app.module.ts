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
import { FooterComponent } from './core/pages/footer/footer.component';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './core/pages/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenAuthInterceptor } from './API/token-auth.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProjectManagementModule } from './project-management/project-management.module';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenAuthInterceptor,
  multi: true,
};
@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
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
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatSlideToggleModule,
    ProjectManagementModule,
  ],
  providers: [INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}
