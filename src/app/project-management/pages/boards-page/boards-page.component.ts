import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../../../interface/interface';
import { BoardsService } from '../../boards.service';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  bords$: Observable<Array<Board>>;

  constructor(private boards : BoardsService) {}

  ngOnInit(): void {
    this.bords$ = this.boards.bords$;
  }
}
