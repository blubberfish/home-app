import { Language } from './languages';

export enum Gender {
  Male = 'm',
  Female = 'f',
}

export type Name = {
  given: string;
  family: string;
  preferred?: string;
};

export type Person = {
  name: Partial<{ [language in Language]: Name }>;
  gender: Gender;
  dtob: Date; // Date-time of birth
};
