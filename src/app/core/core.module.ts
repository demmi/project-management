import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { AddBoardDialogComponent } from './components/header/add-board/add-board-dialog.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    MainPageComponent,
    ConfirmationModalComponent,
    AddBoardDialogComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ConfirmationModalComponent,
  ],
})
export class CoreModule {}
