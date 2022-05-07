import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddColumnDialogComponent } from './add-column-dialog/add-column-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { BoardEntityService } from '../../services/board-entity.service';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Board, Column, AddColumnDialogData } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/column-entity.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {

  board$: Observable<Board | undefined>;

  columns$: Observable<Column[] | undefined>;

  columns: number[] = [];

  boardId: string;

  nextColumnOrder: number = 0;

  orderSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private boardsService: BoardEntityService,
    private columnService: ColumnEntityService,
  ) {}

  ngOnInit(): void {
    let columnsLoaded: boolean = false;
    this.boardId = this.route.snapshot.params['id'];
    this.board$ = this.boardsService.entities$
      .pipe(
        map(boards => boards.find(board => board.id === this.boardId)),
      );
    this.columns$ = this.columnService.entities$
      .pipe(
        tap(() => {
          if (!columnsLoaded) {
            this.columnService.getWithQuery(this.boardId);
            columnsLoaded = true;
          }
        }),
        map(columns => columns.filter(column => column.boardId === this.boardId)),
      );
    this.orderSub = this.columns$
      .pipe(
        map(columns => {
          if (columns) {
            return columns.length;
          }
          return 0;
        }),
      ).subscribe(order => this.nextColumnOrder = order);
  }

  openAddColumnDialog(): void {
    this.dialog.open<AddColumnDialogComponent, AddColumnDialogData>(
      AddColumnDialogComponent,
      {
        data:
          {
            boardId: this.boardId,
            order: this.nextColumnOrder,
          },
      });
  }

  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
