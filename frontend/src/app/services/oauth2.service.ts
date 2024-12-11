import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from '../constants/app.endpoints';
import { GetTokenResponse } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class OAuthService {
  constructor(private http: HttpClient) {}
  authUrl = BASE_URL + '/auth';

  getAccessToken(code: string) {
    return this.http.get<GetTokenResponse>(
      `${this.authUrl}/get-access-token?code=${code}`
    );
  }
  removeUser(id: string) {
    return this.http.delete(`${this.authUrl}/remove/${id}`);
  }

  fetchData(token: string) {
    return this.http.get(`${this.authUrl}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
  }
}
