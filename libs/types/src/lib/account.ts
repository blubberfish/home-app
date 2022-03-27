import { Person } from './common/people';

export type PersonEntity = Person & {
  uuid: string;
};

export type Account = {
  _meta: {
    createdOn: Date;
    updatedOn?: Date;
  };
  displayName: string;
  username: string;
  password: string;
  family: {
    parents: PersonEntity[];
    children: PersonEntity[];
  };
};
