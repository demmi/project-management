import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user.interface';
import { AuthActions } from '../../store/actions/auth.action-types';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {

  form: FormGroup = this.createForm();

  hidePassword: boolean = true;

  signUpSub: Subscription;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
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

  submit(): void {
    if (this.form.valid) {
      const user: User = { ...this.form.value };
      this.signUpSub = this.authService.signup(user)
        .subscribe(
          () => this.store.dispatch(AuthActions.signup({ user })),
        );
    }
  }

  ngOnDestroy(): void {
    if (this.signUpSub) {
      this.signUpSub.unsubscribe();
    }
  }

}
