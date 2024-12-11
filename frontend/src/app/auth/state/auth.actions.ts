import { createAction, props } from '@ngrx/store';
import {
  GetTokenPayload,
  GetTokenResponse,
  RemoveUserPayload,
  User,
} from '../../models/auth.models';

const feature = '[Auth]';
export enum AuthActionTypes {
  GetAccessToken = `${feature} Get Access Token`,
  GetAccessTokenSuccess = `${feature} Get Access Token Success`,
  RemoveUser = `${feature} Remove User`,
  RemoveUserSuccess = `${feature} Remove User Success`,
  SetToken = `${feature} Set Token`,
  FetchData = `${feature} Fetch Data`,
  Reset = `${feature} Reset`,
}

export const getAccessToken = createAction(
  AuthActionTypes.GetAccessToken,
  props<GetTokenPayload>()
);

export const getAccessTokenSuccess = createAction(
  AuthActionTypes.GetAccessTokenSuccess,
  props<GetTokenResponse>()
);

export const removeUser = createAction(
  AuthActionTypes.RemoveUser,
  props<RemoveUserPayload>()
);

export const removeUserSuccess = createAction(
  AuthActionTypes.RemoveUserSuccess
);

export const setToken = createAction(
  AuthActionTypes.SetToken,
  props<{ token: string; user: User }>()
);

export const fetchData = createAction(
  AuthActionTypes.FetchData,
  props<{ token: string }>()
);

export const reset = createAction(AuthActionTypes.Reset);
