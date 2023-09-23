/** @type {import('esbuild').BuildOptions} */
export default {
  bundle: true,
  entryPoints: [
    { in: 'src/index.ts', out: 'cradle' },
    { in: 'public/index.html', out: 'index' },
  ],
  loader: {
    '.html': 'copy',
  },
  treeShaking: true,
  format: 'iife',
  platform: 'browser',
  target: 'esnext',
  outdir: 'dist',
};
