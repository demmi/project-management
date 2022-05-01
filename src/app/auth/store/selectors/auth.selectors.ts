import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from '../redusers/auth.redusers';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser = createSelector(
  selectAuthState,
  state => state.user,
);

export const selectToken = createSelector(
  selectAuthState,
  state => state.token,
);
