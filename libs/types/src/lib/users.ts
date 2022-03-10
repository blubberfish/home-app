export interface UserProfile {
  familyName: string;
  givenName: string;
  preferredName?: string;
}

export interface User extends UserProfile {
  createdOn: string;
  updatedOn?: string;
}
