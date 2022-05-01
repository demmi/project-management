import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user.interface';
import { AuthActions } from '../../store/actions/auth.action-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  @ViewChild('form') form: NgForm;

  constructor(private store: Store) {}

  hidePassword: boolean = true;

  submit() {
    if (this.form.valid) {
      const user: User = {
        login: this.form.controls['login'].value,
        name: this.form.controls['name'].value,
        password: this.form.controls['password'].value,
      };
      this.store.dispatch(AuthActions.signup({ user }));
    }
  }
}
