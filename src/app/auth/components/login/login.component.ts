import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '../../model/user.interface';
import { AuthActions } from '../../store/actions/auth.action-types';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {

  form: FormGroup = this.createForm();

  hidePassword: boolean = true;

  loginSub: Subscription;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {}

  get login(): AbstractControl | null {
    return this.form.get('login');
  }

  get password(): AbstractControl | null {
    return this.form.get('password');
  }

  createForm(): FormGroup {
    return this.fb.group({
      login: this.fb.control(null, Validators.required),
      password: this.fb.control(null, Validators.required),
    });
  }

  submit(): void {
    if (this.form.valid) {
      const user: User = { ...this.form.value };
      this.loginSub = this.authService.login(user)
        .subscribe(
          (response) => this.store.dispatch(AuthActions.login({ user, token: response.token })));
    }
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }

}
