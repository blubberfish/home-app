import { compare, hash } from 'bcrypt';

const {
  env: { SALT },
} = process;

const fallback = 10;

export const obfuscate = (password: string) => {
  const salt = /^[1-9][0-9]*$/.test(SALT) ? parseInt(SALT) : fallback;
  return hash(password, salt);
};

export const match = (password: string, reference: string) =>
  compare(password, reference);
