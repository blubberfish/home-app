import { Person } from './common/people';

export type PersonEntity = Person & {
  uuid: string;
};

export type AccountInfo = {
  displayName: string;
  username: string;
  family: {
    parents: PersonEntity[];
    children: PersonEntity[];
  };
};

export type Account = AccountInfo & {
  _meta: {
    createdOn: Date;
    updatedOn?: Date;
  };
  password: string;
};

export type CreateAccountPayload = {
  displayName: string;
  username: string;
  password: string;
};
