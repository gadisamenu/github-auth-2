import { createReducer, on } from '@ngrx/store';
import {
  getAccessToken,
  getAccessTokenSuccess,
  removeUser,
  removeUserSuccess,
  reset,
  setToken,
} from './auth.actions';
import { LCL_ACCESS_TOKEN_NAME } from '../../constants/common';
import { User } from '../../models/auth.models';

getAccessToken;

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error?: any;
}

export const initialState: AuthState = {
  accessToken: null,
  user: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(getAccessToken, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getAccessTokenSuccess, (state, data) => ({
    ...state,
    accessToken: data.accessToken,
    user: data.user,
    loading: false,
  })),

  on(removeUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(removeUserSuccess, (state) => {
    return {
      ...state,
      accessToken: null,
      user: null,
      loading: false,
    };
  }),

  on(setToken, (state, data) => ({
    ...state,
    accessToken: data.token,
    user: data.user,
    loading: true,
  })),

  on(reset, () => initialState)
);
