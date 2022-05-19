import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddColumnDialogComponent } from './add-column-dialog/add-column-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { BoardEntityService } from '../../services/boards/board-entity.service';
import { map, Observable, Subscription, tap } from 'rxjs';
import { Board, Column, AddColumnDialogData, Task } from '../../../interface/interface';
import { ColumnEntityService } from '../../services/columns/column-entity.service';
import { User } from '../../../auth/model/user.interface';
import { UserEntityService } from '../../services/users/user-entity.service';
import { ApiKanbanRestService } from '../../../API/api-kanban-rest.service';
import { TaskEntityService } from '../../services/tasks/task-entity.service';
import { MergeStrategy } from '@ngrx/data';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {

  board$: Observable<Board | undefined>;

  columns$: Observable<Column[] | undefined>;

  users$: Observable<User[] | undefined>;

  columns: number[] = [];

  boardId: string;

  nextColumnOrder: number = 0;

  boardSub: Subscription;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private boardsService: BoardEntityService,
    private columnService: ColumnEntityService,
    private userService: UserEntityService,
    private taskService: TaskEntityService,
    private api: ApiKanbanRestService,
  ) {}

  ngOnInit(): void {
    this.boardId = this.route.snapshot.params['id'];

    this.boardSub = this.api.boardGet(this.boardId)
      .pipe(
        tap((board: Board) => {
          const tasksToCache: Task[] = [];
          const columns: Column[] | undefined = board.columns?.map((column: Column) => {
            const { tasks, ...rest } = column;
            tasks?.forEach(task => tasksToCache.push({ ...task, boardId: board.id, columnId: column.id }));
            return { ...rest, boardId: board.id };
          });
          this.boardsService.addOneToCache(
            { id: board.id, title: board.title },
            { mergeStrategy: MergeStrategy.IgnoreChanges },
          );
          this.taskService.addManyToCache(
            [...tasksToCache],
            { mergeStrategy: MergeStrategy.IgnoreChanges },
          );
          if (columns)
            this.columnService.addManyToCache(
              [...columns],
              { mergeStrategy: MergeStrategy.IgnoreChanges },
            );
        }),
      ).subscribe();

    this.board$ = this.boardsService.entities$
      .pipe(
        map(boards => boards.find(board => board.id === this.boardId)),
      );

    this.columns$ = this.columnService.entities$
      .pipe(
        tap((columns: Column[]) => this.nextColumnOrder = columns.length),
        map(columns => columns.filter(column => column.boardId === this.boardId)),
      );
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
    if (this.boardSub) {
      this.boardSub.unsubscribe();
    }
  }
}
