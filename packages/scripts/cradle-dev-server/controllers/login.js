import { compare } from 'bcrypt';
import { Router, urlencoded } from 'express';
import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';
import { withMongoDBClient } from '../middlewares/index.js';
import { log } from '../../utils/index.js';

const MODULE = '[DevServer:LoginController]';

const FAIL_REASON = {
  MISSING_USERNAME_PASSWORD: 'e.1.no_username_password',
  BAD_CREDENTIAL: 'e.2.bad_credential',
};

const controller = Router();

controller.use(
  withMongoDBClient(
    `mongodb+srv://${process.env.DB_U}:${process.env.DB_S}@${process.env.DB_H}/`,
  ),
);

controller.post(
  '/login',
  urlencoded({ extended: true }),
  /** @type {import('express').RequestHandler} */
  async (req, res, next) => {
    log.info(
      MODULE,
      req.method,
      new URL(req.url, `${req.protocol}://${req.headers.host}`).toString(),
    );
    const body = req.body ?? {};
    const userid = body.userid?.trim();
    const password = body.password?.trim();
    if (!userid || !password) {
      return next(new Error(FAIL_REASON.MISSING_USERNAME_PASSWORD));
    }
    /** @type {import('mongodb').MongoClient} */
    const dbclient = res.locals.dbclient;
    const accountCollection = dbclient.db('cradle').collection('account');
    try {
      const account = await accountCollection.findOne(
        { username: userid },
        { projection: { _id: 1, password: 1 } },
      );
      if (!account) {
        return next(new Error(FAIL_REASON.BAD_CREDENTIAL));
      }
      if (password && (await compare(password, account.password))) {
        const token = nanoid();
        const { matchedCount } = await accountCollection.updateOne(
          {
            _id: new ObjectId(account._id),
          },
          {
            $set: {
              session: {
                token,
                created: new Date(),
              },
            },
          },
        );
        if (!matchedCount) {
          throw new Error('could not set token');
        }
        const url = new URL(req.headers.referer);
        url.search = new URLSearchParams({
          token,
          uid: account._id,
        }).toString();
        return res.redirect(url.toString());
      }
      return next(new Error(FAIL_REASON.BAD_CREDENTIAL));
    } catch (e) {
      return next(e);
    }
  },
  /** @type {import('express').ErrorRequestHandler} */
  (err, req, res, next) => {
    log.info(MODULE, 'Rejected', err.message);
    if (res.headersSent) {
      return next(err);
    }
    const url = new URL(req.headers.referer);
    url.search = new URLSearchParams({ failreason: err.message }).toString();
    res.redirect(url.toString());
  },
);

export const LoginController = controller;
