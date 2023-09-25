#!/usr/bin/env node
import express from 'express';
import path from 'path';
import { importConfig, log } from '../utils/index.js';
import { LoginController } from './controllers/index.js';

const MODULE = '[DevServer]';

log.info(MODULE, `Started.`);

const devServerConfig = await importConfig(
  path.resolve('dev-server.config.js'),
  {
    useDefault: true,
  },
);

function startServer() {
  const port = devServerConfig?.port || 8000;
  const app = express();

  log.info(
    MODULE,
    devServerConfig?.staticDir
      ? `Static files located at ${path.resolve(devServerConfig.staticDir)}.`
      : `No static files.`,
  );
  if (devServerConfig?.staticDir) {
    app.use(express.static(devServerConfig?.staticDir || 'dist'));
  }

  app.use('/api', LoginController);

  app.listen(port, () => {
    log.info(MODULE, `Listening to port ${port}.`);
  });
}

startServer();
