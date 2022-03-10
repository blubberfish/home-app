export interface UserLoginInfo {
  username: string;
  password: string;
}

export interface UserProfile {
  familyName: string;
  givenName: string;
  preferredName?: string;
}

export interface User extends UserLoginInfo, UserProfile {
  createdOn: string;
  updatedOn?: string;
}

export interface CreateUserPayload {
  familyName: string;
  givenName: string;
  password: string;
  username: string;
  preferredName?: string;
}
