#!/usr/bin/env node
import * as esbuild from 'esbuild';
import path from 'path';
import { importConfig, log } from './utils/index.js';

log.info('[cradle-build]: Started');

const root = process.cwd();

const buildConfig = await importConfig(path.resolve('esbuild.config.js'), {
  useDefault: true,
});

if (!buildConfig) {
  log.error('[cradle-build]: no build config available');
  process.exit(1);
}

await esbuild.build(buildConfig);
