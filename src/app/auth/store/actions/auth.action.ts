import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.interface';

export const login = createAction(
  '[Login Page] User Login',
  props<{ user: User }>(),
);

export const signup = createAction(
  '[Login Page] User Signup',
  props<{ user: User }>(),
);

export const logout = createAction(
  '[Profile Menu] User Logout,',
);

export const setToken = createAction(
  '[Auth Effect] Set Token',
  props<{ token: string }>(),
);
