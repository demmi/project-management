import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user.interface';
import { AuthActions } from '../../store/actions/auth.action-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {

  form: FormGroup = this.createForm();

  hidePassword: boolean = true;

  constructor(
    private store: Store,
    private fb: FormBuilder,
  ) {}

  get login(): AbstractControl | null {
    return this.form.get('login');
  }

  get name(): AbstractControl | null {
    return this.form.get('name');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  createForm(): FormGroup {
    return this.fb.group({
      login: this.fb.control(null, Validators.required),
      name: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required),
    });
  }

  submit() {
    if (this.form.valid) {
      const user: User = { ...this.form.value };
      this.store.dispatch(AuthActions.signup({ user }));
    }
  }
}
