#!/usr/bin/env node
import { hash } from 'bcrypt';
import { log } from './utils/index.js';

const {
  argv: [, , passwordText],
} = process;

const MODULE = '[Password]';

log.info(MODULE, 'Converting to hash.');
const pwhash = await hash(passwordText, parseInt(process.env.SALT || '10'));
log.info(MODULE, pwhash);
