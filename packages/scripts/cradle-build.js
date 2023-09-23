#!/usr/bin/env node
import * as esbuild from 'esbuild';
import path from 'path';
import { importConfig, log } from './utils/index.js';

log.info('[cradle-build]: Started.');

const watchMode = process.argv.includes('--watch', 2);

const buildConfig = await importConfig(path.resolve('esbuild.config.js'), {
  useDefault: true,
});

if (!buildConfig) {
  log.error('[cradle-build]: No build config available.');
  process.exit(1);
}

if (!watchMode) {
  log.info('[cradle-build]: Bundling.');
  await esbuild.build(buildConfig);
} else {
  log.info('[cradle-build]: Watch mode enabled.');
  const { watch } = await esbuild.context(buildConfig);
  await watch();
}
