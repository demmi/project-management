import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { DialogNewBoard, HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ConfirmationModal } from './components/confirmation modal/confirmation-modal';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    MainPageComponent,
    DialogNewBoard,
    ConfirmationModal,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    DialogNewBoard,
    ConfirmationModal,
  ],
})
export class CoreModule {}
