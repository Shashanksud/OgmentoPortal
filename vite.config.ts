/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint() as Plugin],
  resolve: {
    alias: {
      '@': resolve(root),
    },
  },
});
