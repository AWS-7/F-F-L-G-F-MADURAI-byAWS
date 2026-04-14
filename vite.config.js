import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/F-F-L-G-F-MADURAI-byAWS/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Optimize chunk size for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries for better caching
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // Separate PDF libraries (heavy)
          pdf: ['jspdf', 'html2canvas'],
          // Separate animation libraries
          animation: ['aos'],
        },
      },
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Minify options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log in production
        drop_debugger: true, // Remove debugger statements
      },
    },
    // Target modern browsers for smaller bundles
    target: 'es2020',
  },
});
