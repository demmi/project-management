import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { filter, first, Observable, tap } from 'rxjs';
import { BoardEntityService } from './board-entity.service';

@Injectable({ providedIn: 'root' })
export class BoardsResolver implements Resolve<boolean> {

  constructor(private boardsService: BoardEntityService) {}

  resolve(): Observable<boolean> {
    return this.boardsService.loaded$
      .pipe(
        tap(loaded => {
          if (!loaded) {
            this.boardsService.getAll();
          }
        }),
        filter(loaded => loaded),
        first(),
      );
  }

}
