import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.interface';
import { AuthActions } from '../../store/actions/auth.action-types';
import { AuthSelectors } from '../../store/selectors/auth.selector-types';
import { UserEntityService } from '../../../project-management/services/users/user-entity.service';

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
  ) {}

  ngOnInit(): void {
    this.store.select(AuthSelectors.selectUser).subscribe(user => {
      this.user = { ...user as User };
      this.form = this.createForm();
    });
    this.userService.getAll();
    this.userService.entities$.subscribe(users => this.user.id = users.find(elem => elem.login === this.user.login)?.id);
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
      login: this.fb.control(this.user.login, Validators.required),
      name: this.fb.control(this.user.name, Validators.required),
      password: this.fb.control(null, Validators.required),
    });
  }

  submit(): void {
    if (this.form.valid) {
      this.showSpinner = true;
      const user: User = { ...this.form.value };
      this.editSub = this.authService.editUser(this.user.id as string, user)
        .subscribe(
          () => this.store.dispatch(AuthActions.signup({ user })),
          () => this.showSpinner = false,
        );
    }
  }

}
