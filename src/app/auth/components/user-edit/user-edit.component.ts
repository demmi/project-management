import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, first, Subscription, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.interface';
import { AuthActions } from '../../store/actions/auth.action-types';
import { AuthSelectors } from '../../store/selectors/auth.selector-types';
import { UserEntityService } from '../../../project-management/services/users/user-entity.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_BAR_CONFIG } from '../../../constants/constants';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {

  user: User;

  form: FormGroup;

  hidePassword: boolean = true;

  editSub: Subscription;

  showSpinner: boolean = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserEntityService,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.store.select(AuthSelectors.selectUser)
      .subscribe(user => {
        this.user = { ...user as User };
        this.form = this.createForm();
      });
    this.userService.getAll()
      .pipe(
        switchMap(() => this.userService.entities$),
        first(),
      )
      .subscribe((users) => {
        const user = users.find(elem => elem.login === this.user.login);
        this.user = { ...user as User };
        this.form.get('name')?.setValue(this.user.name);
      });

  }

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
      login: this.fb.control(this.user.login, [Validators.required, Validators.minLength(3)]),
      name: this.fb.control(this.user.name, [Validators.required, Validators.minLength(3)]),
      password: this.fb.control(this.user.password, [Validators.required, Validators.minLength(3)]),
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.showSpinner = true;
      const user: User = { ...this.form.value };
      const userId = this.user.id as string;
      this.editSub = this.authService.editUser(userId, user)
        .pipe(
          finalize(() => this.showSpinner = false),
        )
        .subscribe(
          () => {
            this.store.dispatch(AuthActions.signup({ user }));
            this.userService.updateOneInCache({ id: userId as string, ...user });
          },
          () => this._snackBar.open(
            'Login is already exist!',
            'Ok',
            SNACK_BAR_CONFIG,
          ),
        );
    }
  }

}
