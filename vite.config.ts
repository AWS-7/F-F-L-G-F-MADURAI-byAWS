import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/F-F-L-G-F-MADURAI-byAWS/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
