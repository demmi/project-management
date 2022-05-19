import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmmitService {

  private boardId = new BehaviorSubject<string>('');

  public boardId$ = this.boardId.asObservable();

  private columnId = new BehaviorSubject<string>('');

  public columnId$ = this.columnId.asObservable();

  public emmitBoardId(id: string): void {
    this.boardId.next(id);
  }

  public emmitColumnId(id: string): void {
    this.columnId.next(id);
  }

}
