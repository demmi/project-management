import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
  ],
})
export class CoreModule {}
