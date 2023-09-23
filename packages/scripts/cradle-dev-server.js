#!/usr/bin/env node
import express from 'express';
import { log } from './utils/index.js';

function startServer() {
  const port = process.env.PORT || 8000;
  const app = express();

  app.use(express.static('dist'));

  app.listen(port, () => {
    log.info(`[cradle-dev-server]: Listening to port ${port}.`);
  });
}

startServer();
