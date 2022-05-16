import { Pipe, PipeTransform } from '@angular/core';
import { Board } from '../interface/interface';

@Pipe({
  name: 'sortBoards',
})
export class SortBoardsPipe implements PipeTransform {

  transform(boards: Board[], search: string = '', type: string = 'title'): Board[] {
    if (!search.trim) {
      return boards;
    }

    if (type === 'title') {
      return boards.filter(board => {
        return board.title.includes(search);
      });
    }

    return [];
  }

}
