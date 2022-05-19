import { User } from '../../model/user.interface';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.action-types';

export const authFeatureKey: string = 'auth';

export interface AuthState {
  user: User | undefined;
  token: string | undefined;
}

const savedUser: string | null = localStorage.getItem('user');
const savedToken: string | null = localStorage.getItem('token');

export const initialAuthState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : undefined,
  token: savedToken ? savedToken : undefined,
};

export const reducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action): AuthState => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(AuthActions.signup, (state, action): AuthState => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(AuthActions.logout, (): AuthState => {
    return {
      user: undefined,
      token: undefined,
    };
  }),
  on(AuthActions.setToken, (state, action): AuthState => {
    return {
      ...state,
      token: action.token,
    };
  }),
  on(AuthActions.userUpdate, (state, action): AuthState => {
    return {
      ...state,
      user: action.user,
    };
  }),
);
