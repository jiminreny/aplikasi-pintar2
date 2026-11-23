import { build, context } from 'esbuild';
import fs from 'node:fs';

const watch = process.argv.includes('--watch');
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('public/index.html', 'dist/index.html');

const opts = {
  entryPoints: { app: 'src/main.tsx' },
  bundle: true,
  outdir: 'dist',
  format: 'iife',
  target: 'es2020',
  jsx: 'automatic',
  minify: !watch,
  sourcemap: watch,
  define: { 'process.env.NODE_ENV': watch ? '"development"' : '"production"' },
  logLevel: 'info',
};
if (watch) { const ctx = await context(opts); await ctx.watch(); console.log('Memantau perubahan...'); }
else await build(opts);
