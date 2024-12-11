import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { authQuery } from '../state/auth.selector';
import { AuthState } from '../state/auth.reducer';
import { GetTokenPayload, User } from '../../models/auth.models';
import {
  fetchData,
  getAccessToken,
  removeUser,
  setToken,
} from '../state/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  token$;
  error$;
  user$;

  constructor(private store: Store<AuthState>) {
    this.token$ = this.store.select(authQuery.getToken);
    this.error$ = this.store.select(authQuery.getError);
    this.user$ = this.store.select(authQuery.getUser);
  }

  getAccessToken(payload: GetTokenPayload) {
    this.store.dispatch(getAccessToken(payload));
  }

  removeUser(id: string) {
    this.store.dispatch(removeUser({ id }));
  }

  setUserToken(payload: { token: string; user: User }) {
    this.store.dispatch(setToken(payload));
  }

  fetchUserData(token: string) {
    this.store.dispatch(fetchData({ token }));
  }
}
