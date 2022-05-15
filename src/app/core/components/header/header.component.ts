import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, fromEvent, map, Observable, throttleTime } from 'rxjs';
import { User } from '../../../auth/model/user.interface';
import { AuthSelectors } from '../../../auth/store/selectors/auth.selector-types';
import { AuthActions } from '../../../auth/store/actions/auth.action-types';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardDialogComponent } from './add-board/add-board-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  siteLanguage: string = 'en';

  isLogged$: Observable<boolean>;

  user$: Observable<User | undefined>;

  top$: Observable<boolean>;

  constructor(
    private store: Store,
    public router: Router,
    public dialog: MatDialog,
    private service: TranslocoService,
  ) {}

  changeSiteLanguage(language: string): void {
    this.service.setActiveLang(language);
  }

  ngOnInit(): void {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isLogged$ = this.user$.pipe(map((user) => !!user));
  }

  ngAfterViewInit(): void {
    this.top$ = fromEvent(window, 'scroll').pipe(
      throttleTime(10),
      map(() => (window.pageYOffset > 0)),
      distinctUntilChanged(),
    );
  }

  LogOut() {
    this.store.dispatch(AuthActions.logout());
  }

  newBoardDialog(): void {
    this.dialog.open(AddBoardDialogComponent);
  }
}
