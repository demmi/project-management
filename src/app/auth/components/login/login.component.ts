import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../model/user.interface';
import { AuthActions } from '../../store/actions/auth.action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  @ViewChild('form') form: NgForm;

  hidePassword: boolean = true;

  constructor(private store: Store) {
  }

  submit() {
    if (this.form.valid) {
      const user: User = {
        login: this.form.controls['login'].value,
        password: this.form.controls['password'].value,
      };
      this.store.dispatch(AuthActions.login({ user }));
    }
  }
}
