import { existsSync } from 'fs';
import { parse as parsePath } from 'path';
import * as log from './log.js';

function isModule(ext) {
  return /\.(?:c|m)?js$/i.test(ext);
}

function isJSON(ext) {
  return /\.json$/i.test(ext);
}

/** @type { { (file: string, options?: { useDefault?: boolean }): any } } */
export async function importConfig(file, options) {
  log.info(`[importConfig]: ${file}`);
  if (!existsSync(file)) {
    log.error(`[importConfig]: does not exist`);
    return null;
  }
  const { ext } = parsePath(file);
  if (isModule(ext)) {
    log.info(`[importConfig]: js`);
    const config = await import(file);
    if (options?.useDefault) {
      log.info(`[importConfig]: using default export`);
      return config?.default;
    }
    return config;
  }
  if (isJSON(ext)) {
    log.error(`[importConfig]: ${file} json`);
    const config = await import(file, { assert: { type: 'JSON' } });
    return config;
  }
  log.warning(`[importConfig]: unsupported format ${ext}`);
  return null;
}
