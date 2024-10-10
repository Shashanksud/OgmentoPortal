import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import eslint from 'vite-plugin-eslint2';
import basicSsl from '@vitejs/plugin-basic-ssl';

const root = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint({ fix: true }), basicSsl()],
  resolve: {
    alias: {
      '@': resolve(root),
    },
  },
  server: {
    port: 5174,
  },
});
