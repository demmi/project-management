import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardEntityService } from '../../../project-management/services/boards/board-entity.service';
import { Column, ConfirmDialogData, Task } from '../../../interface/interface';
import { EmmitService } from '../../../project-management/services/emmit.service';
import { ColumnEntityService } from '../../../project-management/services/columns/column-entity.service';
import { TaskEntityService } from '../../../project-management/services/tasks/task-entity.service';
import { Subject, takeUntil } from 'rxjs';
import { EntityCollectionServiceBase } from '@ngrx/data';

type ComparableField = 'boardId' | 'columnId';

interface Ids {
  boardId?: string;
  columnId?: string;
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: 'confirmation-modal.component.html',
})
export class ConfirmationModalComponent implements OnDestroy {

  private unsubscribe$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private boardService: BoardEntityService,
    private emmitService: EmmitService,
    private columnService: ColumnEntityService,
    private taskService: TaskEntityService,
  ) {}

  confirm(): void {
    const entityId = this.data.entity.id;
    const entity = this.data.entity;
    if (this.data.entityType === 'board' && entityId) {
      this.boardService.delete(entityId);
      this.removeFromCacheByEntityId<Column>(entityId, 'boardId', this.columnService);
      this.removeFromCacheByEntityId<Task>(entityId, 'boardId', this.taskService);
    }
    if (this.data.entityType === 'column' && entityId) {
      this.emmitService.emmitBoardId((entity as Column).boardId as string);
      this.columnService.delete(entity as Column);
      this.removeFromCacheByEntityId<Task>(entityId, 'columnId', this.taskService);
    }
    if (this.data.entityType === 'task' && entityId) {
      this.emmitService.emmitBoardId((entity as Task).boardId as string);
      this.emmitService.emmitColumnId((entity as Task).columnId as string);
      this.taskService.delete(entity as Task);
    }
    this.dialogRef.close(true);
  }

  private removeFromCacheByEntityId<T extends Ids>(
    entityId: string,
    comparableField: ComparableField,
    entityService: EntityCollectionServiceBase<T>,
  ): void {
    entityService.entities$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(entities => {
        const entitiesToDelete = entities.filter(entity => entity[comparableField] === entityId);
        entityService.removeManyFromCache(entitiesToDelete);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
