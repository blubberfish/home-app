export type UserLoginInfo = {
  username: string;
  password: string;
};

export type UserProfile = {
  familyName: string;
  givenName: string;
  preferredName?: string;
};

export type UserSession = {
  webToken?: string;
  webTokenCreatedOn?: string;
  socketToken?: string;
  socketTokenCreatedOn?: string;
};

export type User = UserLoginInfo &
  UserProfile &
  UserSession & {
    createdOn: string;
    updatedOn?: string;
  };

export type CreateUserPayload = {
  familyName: string;
  givenName: string;
  password: string;
  username: string;
  preferredName?: string;
};
