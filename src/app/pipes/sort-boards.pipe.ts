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
    type: string,
  ): Board[] {
    if (!search.trim()) {
      return boards;
    }

    if (type === 'title') {
      const idBoards: string[] = this.boardsSort.tasksAll.filter(task => task.title.includes(search)).map((task) => task.boardId);
      return boards.filter((board) => board.id ? idBoards.indexOf(board.id) !== -1 : false);
    }

    if (type === 'order') {
      const idBoards: string[] = this.boardsSort.tasksAll.filter(task => task.order === +(search.trim())).map((task) => task.boardId);
      return boards.filter((board) => board.id ? idBoards.indexOf(board.id) !== -1 : false);
    }

    if (type === 'description') {
      const idBoards: string[] = this.boardsSort.tasksAll.filter(task => task.description.includes(search)).map((task) => task.boardId);
      return boards.filter((board) => board.id ? idBoards.indexOf(board.id) !== -1 : false);
    }

    if (type === 'users') {
      const idUsers: string[] = this.boardsSort.usersAll.filter(user => user.name.includes(search)).map(user => user.id);
      let idBoards: string[] = [];
      if (idUsers.length !== 0) {
        idBoards = this.boardsSort.tasksAll.filter(task =>  idUsers.indexOf(task.userId) !== -1);
      }
      console.log(idUsers, idBoards);
      return boards.filter((board) => board.id ? idBoards.indexOf(board.id) !== -1 : false);
    }

    return [];
  }
}
