import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationModal } from '../../../core/components/confirmation modal/confirmation-modal';
import { Board } from '../../../interface/interface';
import { BoardsService } from '../../boards.service';

interface Options {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  boards$: Observable<Array<Board>>;

  valueSearch = '';

  selectedValue: string = 'title';

  options: Options[] = [
    { value: 'title', viewValue: 'Task title' },
    { value: 'order', viewValue: 'Task order' },
    { value: 'description', viewValue: 'Task description' },
    { value: 'users', viewValue: 'Users' },
  ];

  constructor(private boards: BoardsService, public dialog: MatDialog) {
    this.boards.getToken();
  }

  ngOnInit(): void {
    this.boards$ = this.boards.boards$;
  }

  openDialog(id: string = '') {
    const dialogRef = this.dialog.open(ConfirmationModal);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && id.length > 0) {
        this.boards.boardDelete(id).subscribe();
      }
    });
  }
}
