export interface GetTokenPayload {
  code: string;
}

export interface RemoveUserPayload {
  id: string;
}

export interface User {
  id: string;
  avatar: string;
  username: string;
  email: string;
  bio: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetTokenResponse {
  accessToken: string;
  user: User;
}
