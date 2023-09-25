import { compare } from 'bcrypt';
import { Router, urlencoded } from 'express';
import { withMongoDBClient } from '../middlewares/index.js';
import { log } from '../../utils/index.js';

const MODULE = '[DevServer:LoginController]';

const controller = Router();

controller.use(
  withMongoDBClient(
    `mongodb+srv://${process.env.DB_U}:${process.env.DB_S}@${process.env.DB_H}/`,
  ),
);

controller.post('/login', urlencoded(), async (req, res) => {
  log.info(MODULE, req.body);
  res.sendStatus(200);
});

export const LoginController = controller;
