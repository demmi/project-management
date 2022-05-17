import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../interface/interface';
import { BoardsSortService } from '../project-management/services/boards/boards-sort.service';

@Pipe({
  name: 'sortBoards',
})
export class SortBoardsPipe implements PipeTransform {

  constructor(private boardsSort: BoardsSortService) {}

  transform(
    boards: Board[],
    search: string,
    type: string = 'title',
  ): Board[] {
    if (!search.trim()) {
      return boards;
    }

    if (type === 'title') {
      const idBoards: string[] = this.boardsSort.tasksAll.filter(task => task.title.includes(search)).map((task) => task.boardId);
      return boards.filter((board) => board.id ? idBoards.indexOf(board.id) !== -1 : false);
    }

    return [];
  }
}
