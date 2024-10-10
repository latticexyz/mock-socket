import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/intercept.ts'],
  target: 'esnext',
  format: ['cjs'],
  dts: true,
  sourcemap: true,
  clean: true
});
