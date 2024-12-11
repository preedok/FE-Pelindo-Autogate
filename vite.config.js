import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'date-fns': 'date-fns',
      '@mui/x-date-pickers': '@mui/x-date-pickers',
    },
  },
});