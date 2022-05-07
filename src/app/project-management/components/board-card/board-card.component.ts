import { Component, Input } from '@angular/core';
import { Board } from '../../../interface/interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../../core/components/confirmation modal/confirmation-modal.component';

@Component({
  selector: 'app-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {

  @Input() board: Board;

  @Input() index: number;

  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    this.dialog.open(ConfirmationModalComponent);
  }

}
