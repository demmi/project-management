import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { User } from '../../../auth/model/user.interface';
import { AuthSelectors } from '../../../auth/store/selectors/auth.selector-types';
import { AuthActions } from '../../../auth/store/actions/auth.action-types';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  siteLanguage: string = 'en';

  isLogged$: Observable<boolean>;

  user$: Observable<User | undefined>;

  constructor(private store: Store, private service: TranslocoService) {  }

  changeSiteLanguage(language: string): void {
    this.service.setActiveLang(language);
  }

  ngOnInit(): void {
    this.user$ = this.store.select(AuthSelectors.selectUser);
    this.isLogged$ = this.user$.pipe(map(user => !!user));
  }

  LogOut() {
    this.store.dispatch(AuthActions.logout());
  }

}
