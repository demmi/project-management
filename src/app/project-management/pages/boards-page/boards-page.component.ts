import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmationModalComponent } from '../../../core/components/confirmation modal/confirmation-modal.component';
import { Board } from '../../../interface/interface';
import { BoardEntityService } from '../../services/board-entity.service';


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

  constructor(private boardsService: BoardEntityService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.boards$ = this.boardsService.entities$;
  }

  openDialog(id: string = '') {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    console.log(id);
    dialogRef.afterClosed().subscribe();
  }
}
