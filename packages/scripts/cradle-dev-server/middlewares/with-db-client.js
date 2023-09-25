import { MongoClient } from 'mongodb';
import { log } from '../../utils/index.js';

/** @type {{ (url: string): import('mongodb').MongoClient }} */
const getClient = (() => {
  /** @type {Record<string, import('mongodb').MongoClient>} */
  const clientMemo = {};
  return (url) => {
    if (clientMemo[url]) return clientMemo[url];
    log.info('[withMongoDBClient]', url);
    clientMemo[url] = new MongoClient(url);
    return clientMemo[url];
  };
})();

/** @type {{ (url: string): import('express').Handler }} */
export function withMongoDBClient(url) {
  const dbclient = getClient(url);
  return (req, res, next) => {
    try {
      res.locals.dbclient = dbclient;
      next();
    } catch (e) {
      next(e);
    }
  };
}
