export type UserLoginInfo = {
  username: string;
  password: string;
};

export type UserProfile = {
  familyName: string;
  givenName: string;
  preferredName?: string;
};

export type UserWebSessionInfo = {
  session?: string;
  startedOn?: string;
};

export type UserSocketSessionInfo = {
  session?: string;
  startedOn?: string;
};

export type UserMetaInfo = {
  createdOn: string;
  updatedOn?: string;
};

export type User = UserLoginInfo &
  UserProfile & {
    sessionContext?: {
      web?: UserWebSessionInfo;
      socket?: UserSocketSessionInfo;
    };
    meta: UserMetaInfo;
  };

export type CurrentUser = Omit<User, 'sessionContext' | 'password'>;

export type CreateUserPayload = {
  familyName: string;
  givenName: string;
  password: string;
  username: string;
  preferredName?: string;
};
