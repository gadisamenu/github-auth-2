import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthActionTypes } from './auth.actions';
import { OAuthService } from '../../services/oauth2.service';
import { GetTokenPayload, RemoveUserPayload } from '../../models/auth.models';
import { LCL_ACCESS_TOKEN_NAME, LCL_USER_NAME } from '../../constants/common';

@Injectable()
export class AuthEffects {
  getAccessToken$;
  removeUser$;
  fetchData$;
  constructor(
    private actions$: Actions,
    private oauthService: OAuthService // private router: Router
  ) {
    this.getAccessToken$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActionTypes.GetAccessToken),
        exhaustMap((data: GetTokenPayload) => {
          return this.oauthService.getAccessToken(data.code).pipe(
            map((resp) => {
              return {
                ...resp,
                type: AuthActionTypes.GetAccessTokenSuccess,
              };
            }),
            tap((resp) => {
              localStorage.setItem(LCL_ACCESS_TOKEN_NAME, resp.accessToken);
              localStorage.setItem(LCL_USER_NAME, JSON.stringify(resp.user));
            }),
            catchError(() => EMPTY)
          );
        })
      )
    );

    this.removeUser$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActionTypes.RemoveUser),
        exhaustMap((payload: RemoveUserPayload) => {
          return this.oauthService.removeUser(payload.id).pipe(
            map((resp) => {
              return {
                ...resp,
                type: AuthActionTypes.GetAccessTokenSuccess,
              };
            }),
            tap(() => {
              localStorage.removeItem(LCL_ACCESS_TOKEN_NAME);
              localStorage.removeItem(LCL_USER_NAME);
            }),
            catchError((err) => {
              console.log('error', err);
              if (err.status === 401) {
                localStorage.removeItem(LCL_ACCESS_TOKEN_NAME);
                localStorage.removeItem(LCL_USER_NAME);
              }
              return EMPTY;
            })
          );
        })
      )
    );

    this.fetchData$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActionTypes.FetchData),
          exhaustMap((payload: { token: string }) => {
            return this.oauthService.fetchData(payload.token).pipe(
              tap((resp) => {
                console.log('Data:', resp);
              }),
              catchError((error) => {
                console.error('Error:', error);
                return EMPTY;
              })
            );
          })
        ),
      { dispatch: false }
    );
  }
}
