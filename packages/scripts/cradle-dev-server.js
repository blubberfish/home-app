#!/usr/bin/env node
import express from 'express';
import path from 'path';
import { importConfig, log } from './utils/index.js';

log.info(`[cradle-dev-server]: Started.`);

const devServerConfig = await importConfig(
  path.resolve('dev-server.config.js'),
  {
    useDefault: true,
  },
);

function startServer() {
  const port = process.env.PORT || 8000;
  const app = express();

  log.info(
    devServerConfig?.staticDir
      ? `[cradle-dev-server]: Static files located at ${path.resolve(
          devServerConfig.staticDir,
        )}.`
      : `[cradle-dev-server]: No static files.`,
  );
  if (devServerConfig?.staticDir) {
    app.use(express.static(devServerConfig?.staticDir || 'dist'));
  }

  app.listen(port, () => {
    log.info(`[cradle-dev-server]: Listening to port ${port}.`);
  });
}

startServer();
