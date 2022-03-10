export type UserLoginInfo = {
  username: string;
  password: string;
}

export type UserProfile = {
  familyName: string;
  givenName: string;
  preferredName?: string;
}

export type User = UserLoginInfo & UserProfile & {
  createdOn: string;
  updatedOn?: string;
}

export type CreateUserPayload = {
  familyName: string;
  givenName: string;
  password: string;
  username: string;
  preferredName?: string;
}
