import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const getAuthState = createFeatureSelector<AuthState>('auth');

const getToken = createSelector(
  getAuthState,
  (state: AuthState) => state.accessToken
);
const getLoading = createSelector(
  getAuthState,
  (state: AuthState) => state.loading
);
const getError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

const getUser = createSelector(getAuthState, (state: AuthState) => state.user);

export const authQuery = {
  getToken,
  getError,
  getLoading,
  getUser,
};
