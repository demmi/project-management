import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from '../../../auth/model/user.interface';
import { AuthSelectors } from '../../../auth/store/selectors/auth.selector-types';
import { AuthActions } from '../../../auth/store/actions/auth.action-types';
import { Router } from '@angular/router';
import { BoardsService } from '../../../project-management/boards.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
}
@Component({
  selector: 'app-dialog-new-board',
  templateUrl: 'dialog-new-board.html',
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class DialogNewBoard {
  constructor(
    public dialogRef: MatDialogRef<DialogNewBoard>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  language: boolean;

  isLogged$: Observable<boolean>;

  user$: Observable<User | undefined>;

  titleNewBoard: string;

  constructor(
    private store: Store,
    public router: Router,
    private boards: BoardsService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isLogged$ = this.user$.pipe(map((user) => !!user));
  }

  LogOut() {
    this.store.dispatch(AuthActions.logout());
  }

  newBoardDialog(): void {
    const dialogRef = this.dialog.open(DialogNewBoard, {
      data: { title: this.titleNewBoard },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.trim().length > 0) {
          this.boards.newBoard(result).subscribe();
        }
      }
    });
  }
}
