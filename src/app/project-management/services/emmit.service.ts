import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmmitService {

  private boardId = new BehaviorSubject<string>('');

  public boardId$ = this.boardId.asObservable();

  public emmitBoardId(id: string): void {
    this.boardId.next(id);
  }

}
